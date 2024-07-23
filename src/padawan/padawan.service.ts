import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdatePadawanDto } from 'src/padawan/dto/UpdatePadawan';

@Injectable()
export class PadawanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(withJedi?: boolean) {
    const padawans = this.prisma.padawan.findMany({
      include: {
        user: true,
        jedi: withJedi ? true : false,
      },
    });

    return padawans;
  }

  findOne(id: string | number, withJedi?: boolean) {
    const padawan = this.prisma.padawan.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        user: true,
        jedi: withJedi ? true : false,
      },
    });

    return padawan;
  }

  async update(
    id: string | number,
    updatePadawanDto: UpdatePadawanDto,
    withJedi?: boolean,
  ) {
    const { feedback, jediId, ...userData } = updatePadawanDto;

    const updatedPadawan = await this.prisma.padawan.update({
      where: { id: Number(id) },
      data: {
        feedback: feedback,
        jediId: jediId,
      },
      include: {
        user: true,
        jedi: withJedi ? true : false,
      },
    });

    const user = await this.prisma.user.update({
      where: { id: updatedPadawan.userId },
      data: userData,
    });

    const returnData = {
      ...updatedPadawan,
      user,
    };

    return returnData;
  }

  async create(createPadawanDto: CreatePadawanDto) {
    const { jediId, ...baseUser } = createPadawanDto;

    const user = await this.prisma.user.create({
      data: {
        ...baseUser,
        role: 'PADAWAN',
      },
    });

    const padawan = this.prisma.padawan.create({
      data: {
        userId: user.id,
        jediId: Number(jediId),
      },

      include: {
        user: true,
        jedi: true,
      },
    });

    return padawan;
  }

  delete(id: string | number) {
    return this.prisma.padawan.delete({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });
  }
}
