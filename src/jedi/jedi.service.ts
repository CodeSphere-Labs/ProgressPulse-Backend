import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/database/dto/User.dto';
import { UpdateJediDto } from 'src/jedi/dto/UpdateJedi';

@Injectable()
export class JediService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(withPadawans?: boolean) {
    return this.prisma.user.findMany({
      where: {
        role: 'JEDI',
      },
      include: {
        padawans: withPadawans
          ? {
              include: {
                user: withPadawans ? true : false,
              },
            }
          : false,
      },
    });
  }

  async findOne(id: string | number, withPadawans?: boolean) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        padawans: withPadawans
          ? {
              include: {
                user: withPadawans ? true : false,
              },
            }
          : false,
      },
    });
  }

  async create(createJediDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createJediDto,
        role: 'JEDI',
      },
    });
  }

  async update(
    id: string | number,
    updateJediDto: UpdateJediDto,
    withPadawans?: boolean,
  ) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: updateJediDto,
      include: {
        padawans: withPadawans
          ? {
              include: {
                user: withPadawans ? true : false,
              },
            }
          : false,
      },
    });
  }

  async delete(id: string | number) {
    const { padawans } = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        padawans: true,
      },
    });

    for (const padawan of padawans) {
      await this.prisma.padawan.updateMany({
        where: { id: padawan.id },
        data: { jediId: null },
      });
    }

    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
