import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import * as request from 'supertest';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

describe('JediModule (e2e)', () => {
  let app: INestApplication;

  const mockDataBaseService = {
    user: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    padawan: {
      updateMany: jest.fn(),
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

  describe('GET: /jedi/all', () => {
    const mockJedis = [
      {
        id: 1,
        first_name: 'Obi-Wan',
        last_name: 'Kenobi',
        patronymic: 'Patronymic',
        email: 'obi-wan@mail.com',
        padawans: [],
      },
    ];

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'findMany')
        .mockResolvedValue(mockJedis);
    });

    it('should return OK with jedis data', async () => {
      const response = await request(app.getHttpServer()).get('/jedi/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJedis);
    });
  });

  describe('GET: /jedi/:id', () => {
    const mockJedi = {
      id: 1,
      first_name: 'Obi-Wan',
      last_name: 'Kenobi',
      patronymic: 'Patronymic',
      email: 'obi-wan@mail.com',
      padawans: [],
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'findUniqueOrThrow')
        .mockResolvedValue(mockJedi);
    });

    it('should return OK with jedi data', async () => {
      const response = await request(app.getHttpServer()).get('/jedi/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJedi);
    });
  });

  describe('POST: /jedi', () => {
    const createJediDto = {
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      password: 'useTheForce',
    };

    const createdJedi = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      role: 'JEDI',
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'create')
        .mockResolvedValue(createdJedi);
    });

    it('should return OK with created jedi', async () => {
      const response = await request(app.getHttpServer())
        .post('/jedi')
        .send(createJediDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdJedi);
    });
  });

  describe('PATCH: /jedi/:id', () => {
    const updateJediDto = {
      patronymic: 'UpdatedPatronymic',
    };

    const updatedJedi = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'UpdatedPatronymic',
      email: 'luke@mail.com',
      role: 'JEDI',
      padawans: [],
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'update')
        .mockResolvedValue(updatedJedi);
    });

    it('should return OK with updated jedi', async () => {
      const response = await request(app.getHttpServer())
        .patch('/jedi/1')
        .send(updateJediDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedJedi);
    });
  });

  describe('DELETE: /jedi/:id', () => {
    const deletedJedi = {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'luke@mail.com',
      role: 'JEDI',
      padawans: [],
    };

    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService.user, 'delete')
        .mockResolvedValue(deletedJedi);
    });

    it('should return OK with deleted jedi', async () => {
      const response = await request(app.getHttpServer()).delete('/jedi/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedJedi);
    });
  });
});
