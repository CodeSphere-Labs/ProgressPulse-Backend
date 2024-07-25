import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/database/dto/User.dto';
import { UpdateJediDto } from 'src/jedi/dto/UpdateJedi';
import { JediService } from 'src/jedi/jedi.service';

const jedis = [
  {
    id: 1,
    first_name: 'Obi-Wan',
    last_name: 'Kenobi',
    patronymic: 'Patronymic',
    email: 'obi-wan@mail.ru',
    password: 'password123',
    role: 'JEDI',
  },
  {
    id: 19,
    first_name: 'Qui-Gon',
    last_name: 'Jinn',
    patronymic: 'Patronymic',
    email: 'quigonk@mail.ru',
    password: 'password123',
    role: 'JEDI' as any,
  },
];

const jedi = jedis[0];

describe('JediService', () => {
  let service: JediService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JediService,
        {
          provide: PrismaService,
          useValue: {
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
          },
        },
      ],
    }).compile();

    service = module.get<JediService>(JediService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of jedis', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(jedis);

      const response = await service.findAll(true);

      expect(response).toEqual(jedis);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { role: 'JEDI' },
        include: {
          padawans: {
            include: {
              user: true,
            },
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single jedi', async () => {
      jest.spyOn(prisma.user, 'findUniqueOrThrow').mockResolvedValue(jedi);

      const response = await service.findOne('1', true);

      expect(response).toEqual(jedi);
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1, role: 'JEDI' },
        include: {
          padawans: {
            include: {
              user: true,
            },
          },
        },
      });
    });
  });

  describe('create', () => {
    it('should create a new jedi', async () => {
      const createJediDto: CreateUserDto = {
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'Anakin',
        email: 'luke@example.com',
        password: 'secret',
      };
      const result = {
        id: 2,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'Anakin',
        email: 'luke@example.com',
        password: 'secret',
        role: 'JEDI' as any,
      };
      jest.spyOn(prisma.user, 'create').mockResolvedValue(result);

      const response = await service.create(createJediDto);

      expect(response).toEqual(result);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createJediDto,
          role: 'JEDI',
        },
      });
    });
  });

  describe('update', () => {
    it('should update a jedi', async () => {
      const updateJediDto: UpdateJediDto = {
        first_name: 'Luke',
        last_name: 'Skywalker',
      };
      const result = {
        id: 1,
        first_name: 'Luke',
        last_name: 'Skywalker',
        patronymic: 'The Chosen One',
        email: 'luke@example.com',
        password: 'password123',
        role: 'JEDI' as any,
        padawans: [],
      };
      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      const response = await service.update('1', updateJediDto, true);

      expect(response).toEqual(result);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateJediDto,
        include: {
          padawans: {
            include: {
              user: true,
            },
          },
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a jedi and update related padawans', async () => {
      const padawans = [
        {
          id: 1,
          userId: 1,
          jediId: 1,
        },
      ];

      jest
        .spyOn(prisma.user, 'findUniqueOrThrow')
        .mockResolvedValue({ padawans } as any);
      jest
        .spyOn(prisma.padawan, 'updateMany')
        .mockResolvedValue({ count: 1 } as any);
      jest.spyOn(prisma.user, 'delete').mockResolvedValue({} as any);

      await service.delete('1');

      expect(prisma.padawan.updateMany).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { jediId: null },
      });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
