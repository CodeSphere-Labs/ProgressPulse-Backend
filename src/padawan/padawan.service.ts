import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdatePadawanDto } from 'src/padawan/dto/UpdatePadawan';

@Injectable()
export class PadawanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    const padawans = this.prisma.padawan.findMany({
      include: {
        jedi: true,
      },
    });

    return padawans;
  }

  findOne(id: string | number) {
    const padawan = this.prisma.padawan.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        jedi: true,
      },
    });

    return padawan;
  }

  update(id: string | number, updatePadawanDto: UpdatePadawanDto) {
    return this.prisma.padawan.update({
      where: { id: Number(id) },
      data: updatePadawanDto,
    });
  }

  create(createPadawanDto: CreatePadawanDto) {
    const padawan = this.prisma.padawan.create({
      data: createPadawanDto,
    });

    return padawan;
  }

  delete(id: string | number) {
    return this.prisma.padawan.delete({ where: { id: Number(id) } });
  }
}
