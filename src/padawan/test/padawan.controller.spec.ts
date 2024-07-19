import { Test, TestingModule } from '@nestjs/testing';
import { PadawanService } from '../padawan.service';
import { ResponsePadawanDto } from '../dto/ResponsePadawan';
import { ResponseJediDto } from '../../jedi/dto/ResponseJedi';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';

const obiWan: ResponseJediDto = {
  id: 1,
  first_name: 'Obi-Wan',
  last_name: 'Kenobi',
  patronymic: 'Patronymic',
  email: 'obi-wan@mail.com',
  isActive: true,
  Padawan: {
    id: 1,
    first_name: 'Luke',
    last_name: 'Skywalker',
    patronymic: 'Patronymic',
    email: 'luke@mail.com',
    feedback: [],
    isActive: true,
    jedi: null,
  },
};

const ashokaTano: CreatePadawanDto = {
  first_name: 'Ahsoka',
  last_name: 'Tano',
  patronymic: 'Patronymic',
  email: 'ahsoka@mail.com',
  password: 'password',
  jediId: 1,
};

const padawans: ResponsePadawanDto[] = [
  {
    id: 1,
    first_name: 'Luke',
    last_name: 'Skywalker',
    patronymic: 'Patronymic',
    email: 'luke@mail.com',
    feedback: [],
    isActive: true,
    jedi: obiWan,
  },
];

const onePadawan = padawans[0];

const db = {
  padawan: {
    findMany: jest.fn().mockResolvedValue(padawans),
    findUniqueOrThrow: jest.fn().mockResolvedValue(onePadawan),
    create: jest.fn().mockReturnValue(ashokaTano),
    update: jest.fn().mockResolvedValue(onePadawan),
    delete: jest.fn().mockResolvedValue(onePadawan),
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
  });

  describe('findOne', () => {
    it('should get a single padawan', () => {
      expect(service.findOne('1')).resolves.toEqual(onePadawan);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const updateDto = { patronymic: 'updated' };

      jest
        .spyOn(db.padawan, 'update')
        .mockResolvedValue({ ...onePadawan, ...updateDto });

      const updatedPadawan = await service.update('1', updateDto);
      expect(updatedPadawan).toEqual({ ...onePadawan, patronymic: 'updated' });
    });
  });

  describe('create', () => {
    it('should create a new padawan', async () => {
      const newPadawan = {
        id: 3,
        ...ashokaTano,
      };

      jest.spyOn(db.padawan, 'create').mockResolvedValue(newPadawan);

      const result = await service.create(ashokaTano);
      expect(result).toEqual(newPadawan);
    });
  });

  describe('deleteOne', () => {
    it('should delete a padawan', async () => {
      const result = await service.delete('1');
      expect(result).toEqual(onePadawan);
    });
  });
});
