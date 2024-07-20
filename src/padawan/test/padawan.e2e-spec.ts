import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import * as request from 'supertest';

describe('PadawanModule (e2e)', () => {
  let app: INestApplication;

  const mockDataBaseService = {
    padawan: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDataBaseService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.setGlobalPrefix('api');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET: padawan/all', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService.padawan, 'findMany').mockResolvedValue([]);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer()).get('/padawan/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('GET: padawan/:id', () => {
    const mock = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      feedback: [],
      role: 'PADAWAN',
      jedi: null,
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'findUniqueOrThrow')
        .mockResolvedValue(mock);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer()).get('/padawan/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mock);
    });
  });

  describe('POST: padawan', () => {
    const signUpMock = {
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      password: '12345',
      jediId: 1,
    };
    const returnMock = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      feedback: [],
      role: 'PADAWAN',

      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
        role: 'JEDI',
      },
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'create')
        .mockResolvedValue(returnMock);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer())
        .post('/padawan')
        .send(signUpMock);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(returnMock);
    });
  });

  describe('PATCH: padawan/:id', () => {
    const returnMock = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'PatronymicReturn',
      email: 'luke@mail.com',
      feedback: [],
      role: 'PADAWAN',

      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
        role: 'JEDI',
      },
    };

    const changeMock = {
      patronymic: 'PatronymicReturn',
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'update')
        .mockResolvedValue(returnMock);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer())
        .patch('/padawan/1')
        .send(changeMock);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(returnMock);
    });
  });

  describe('DELETE: padawan/:id', () => {
    const returnMock = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'PatronymicReturn',
      email: 'luke@mail.com',
      feedback: [],
      role: 'PADAWAN',

      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
        role: 'JEDI',
      },
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'delete')
        .mockResolvedValue(returnMock);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer()).delete('/padawan/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(returnMock);
    });
  });
});
