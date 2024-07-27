import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
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
    user: {
      update: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDataBaseService)
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          request.user = { role: 'YODA' }; // Mock user role
          return true;
        },
      })
      .overrideGuard(AccessTokenGuard)
      .useValue({
        canActivate: () => true,
      })
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

  describe('GET: /padawan/all', () => {
    const mockPadawans = [
      {
        id: 1,
        feedback: [],
        user: {
          id: 2,
          first_name: 'Luke',
          last_name: 'Skywalker',
          patronymic: 'Patronymic',
          email: 'luke@mail.com',
        },
        jedi: {
          id: 1,
          first_name: 'Obi-Wan',
          last_name: 'Kenobi',
          patronymic: 'Patronymic',
          email: 'obi-wan@mail.com',
        },
      },
    ];

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'findMany')
        .mockResolvedValue(mockPadawans);
    });

    it('should return OK with padawans data', async () => {
      const response = await request(app.getHttpServer()).get('/padawan/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPadawans);
    });
  });

  describe('GET: /padawan/:id', () => {
    const mockPadawan = {
      id: 1,
      feedback: [],
      user: {
        id: 2,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'Patronymic',
        email: 'luke@mail.com',
      },
      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
      },
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'findUniqueOrThrow')
        .mockResolvedValue(mockPadawan);
    });

    it('should return OK with padawan data', async () => {
      const response = await request(app.getHttpServer()).get('/padawan/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPadawan);
    });
  });

  describe('POST: /padawan', () => {
    const createPadawanDto = {
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      password: '12345',
      jediId: 1,
    };

    const createdPadawan = {
      id: 1,
      feedback: [],
      user: {
        id: 2,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'Patronymic',
        email: 'luke@mail.com',
        role: 'PADAWAN',
      },
      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
      },
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'create')
        .mockResolvedValue(createdPadawan.user);
      jest
        .spyOn(mockDataBaseService.padawan, 'create')
        .mockResolvedValue(createdPadawan);
    });

    it('should return OK with created padawan', async () => {
      const response = await request(app.getHttpServer())
        .post('/padawan')
        .send(createPadawanDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdPadawan);
    });
  });

  describe('PATCH: /padawan/:id', () => {
    const updatedPadawan = {
      id: 1,
      feedback: ['Updated feedback'],
      user: {
        id: 2,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'PatronymicUpdated',
        email: 'luke@mail.com',
      },
      jedi: {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
      },
    };

    const updateDto = {
      patronymic: 'PatronymicUpdated',
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'update')
        .mockResolvedValue(updatedPadawan);
      jest
        .spyOn(mockDataBaseService.user, 'update')
        .mockResolvedValue(updatedPadawan.user);
    });

    it('should return OK with updated padawan', async () => {
      const response = await request(app.getHttpServer())
        .patch('/padawan/1')
        .send(updateDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedPadawan);
    });
  });

  describe('DELETE: /padawan/:id', () => {
    const deletedPadawan = {
      id: 1,
      feedback: ['Feedback'],
      user: {
        id: 2,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'Patronymic',
        email: 'luke@mail.com',
      },
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.padawan, 'delete')
        .mockResolvedValue(deletedPadawan);
    });

    it('should return OK with deleted padawan', async () => {
      const response = await request(app.getHttpServer()).delete('/padawan/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedPadawan);
    });
  });
});
