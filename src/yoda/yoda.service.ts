import { UpdateYodaDto } from './dto/UpdateYoda';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateYodaDto } from 'src/yoda/dto/CreateYoda';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class YodaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany({ where: { role: 'YODA' } });
  }

  async findOne(id: number | string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: Number(id), role: 'YODA' },
    });
  }

  async create(createYodaDto: CreateYodaDto) {
    const yoda = await this.prisma.user.create({
      data: {
        ...createYodaDto,
        role: 'YODA',
      },
    });

    const tokens = await this.authService.signUp(yoda);

    return tokens;
  }

  async update(id: number | string, updateYodaDto: UpdateYodaDto) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: updateYodaDto,
    });
  }

  async delete(id: number | string) {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
