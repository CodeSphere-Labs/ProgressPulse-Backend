import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

describe('PrismaClientExceptionFilter', () => {
  let filter: PrismaClientExceptionFilter;
  let mockResponse: Response;
  let mockArgumentsHost: ArgumentsHost;

  beforeEach(() => {
    filter = new PrismaClientExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
      getNext: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    } as unknown as ArgumentsHost;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(new PrismaClientExceptionFilter()).toBeDefined();
  });

  it('should handle P2002 error', () => {
    const exception = {
      code: 'P2002',
      message: 'Unique constraint failed on the field',
    } as Prisma.PrismaClientKnownRequestError;

    jest.spyOn(console, 'error').mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(console.error).toHaveBeenCalledWith(exception.message);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.CONFLICT,
      message: 'A record already exists in the database',
    });
  });

  it('should handle P2003 error', () => {
    const exception = {
      code: 'P2003',
      message: 'Foreign key constraint failed',
    } as Prisma.PrismaClientKnownRequestError;

    jest.spyOn(console, 'error').mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(console.error).toHaveBeenCalledWith(exception.message);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Bad request',
    });
  });

  it('should handle P2025 error', () => {
    const exception = {
      code: 'P2025',
      message: 'Record to delete does not exist.',
    } as Prisma.PrismaClientKnownRequestError;

    jest.spyOn(console, 'error').mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(console.error).toHaveBeenCalledWith(exception.message);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'A record is not found in the database',
    });
  });

  it('should call super.catch for other errors', () => {
    const exception = {
      code: 'P9999',
      message: 'Unknown error',
    } as Prisma.PrismaClientKnownRequestError;

    jest
      .spyOn(BaseExceptionFilter.prototype, 'catch')
      .mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(console.error).toHaveBeenCalledWith(exception.message);
    expect(BaseExceptionFilter.prototype.catch).toHaveBeenCalledWith(
      exception,
      mockArgumentsHost,
    );
  });
});
