import { Test, TestingModule } from '@nestjs/testing';
import { PadawanService } from '../padawan.service';
import { ResponsePadawanDto } from '../dto/ResponsePadawan';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';
import { UpdatePadawanDto } from 'src/padawan/dto/UpdatePadawan';

// Мок данных
const ashokaTano: CreatePadawanDto = {
  first_name: 'Ahsoka',
  last_name: 'Tano',
  patronymic: 'Patronymic',
  email: 'ahsoka@mail.com',
  password: 'password',
  jediId: 1,
};

const updatedPadawanDto: UpdatePadawanDto = {
  feedback: ['Updated feedback'],
  jediId: 2,
  patronymic: 'Updated Patronymic',
};

const padawans: ResponsePadawanDto[] = [
  {
    id: 2,
    feedback: ['Some feedback'],
    user: {
      id: 3,
      first_name: 'Enakin',
      last_name: 'Skywalker',
      patronymic: 'Patronymic',
      email: 'enakin@mail.ru',
      role: 'PADAWAN',
    },
  },
  {
    id: 3,
    feedback: ['Another feedback'],
    user: {
      id: 4,
      first_name: 'Ashoka',
      last_name: 'Tano',
      patronymic: 'Patronymic',
      email: 'ashoka@mail.ru',
      role: 'PADAWAN',
    },
  },
];

const onePadawan = padawans[0];

const db = {
  padawan: {
    findMany: jest.fn().mockResolvedValue(padawans),
    findUniqueOrThrow: jest.fn().mockResolvedValue(onePadawan),
    create: jest.fn().mockResolvedValue({
      ...ashokaTano,
      id: 3,
    }),
    update: jest.fn().mockResolvedValue({
      ...onePadawan,
      ...updatedPadawanDto,
    }),
    delete: jest.fn().mockResolvedValue(onePadawan),
  },
  user: {
    update: jest.fn().mockResolvedValue({
      id: 3,
      ...updatedPadawanDto,
    }),
    create: jest.fn().mockResolvedValue({
      id: 3,
      ...ashokaTano,
      role: 'PADAWAN',
    }),
  },
};

describe('PadawanService', () => {
  let service: PadawanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PadawanService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<PadawanService>(PadawanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of padawans', async () => {
      const result = await service.findAll();
      expect(result).toEqual(padawans);
    });

    it('should return an array of padawans including jedis if requested', async () => {
      const result = await service.findAll(true);
      expect(result).toEqual(padawans);
    });
  });

  describe('findOne', () => {
    it('should get a single padawan', async () => {
      const result = await service.findOne(2);
      expect(result).toEqual(onePadawan);
    });

    it('should get a single padawan including jedis if requested', async () => {
      const result = await service.findOne(2, true);
      expect(result).toEqual(onePadawan);
    });
  });

  describe('update', () => {
    it('should call the update method and update padawan and user', async () => {
      const updatedPadawan = {
        ...onePadawan,
        feedback: updatedPadawanDto.feedback,
        jediId: updatedPadawanDto.jediId,
        user: {
          id: 3,
          ...updatedPadawanDto,
        },
      };

      jest.spyOn(db.padawan, 'update').mockResolvedValue(updatedPadawan);
      jest.spyOn(db.user, 'update').mockResolvedValue({
        id: 3,
        ...updatedPadawanDto,
      });

      const result = await service.update(2, updatedPadawanDto, true);

      expect(result).toEqual(updatedPadawan);
    });
  });

  describe('create', () => {
    it('should create a new padawan', async () => {
      const newPadawan = {
        id: 3,
        ...ashokaTano,
      };

      const result = await service.create(ashokaTano);
      expect(result).toEqual(newPadawan);
    });
  });

  describe('delete', () => {
    it('should delete a padawan', async () => {
      const result = await service.delete(2);
      expect(result).toEqual(onePadawan);
    });
  });
});
