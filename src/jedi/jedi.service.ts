import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/database/dto/User.dto';

@Injectable()
export class JediService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    const jedis = this.prisma.user.findMany({
      where: {
        role: 'JEDI',
      },
    });

    return jedis;
  }

  create(createJediDto: CreateUserDto) {
    const padawan = this.prisma.user.create({
      data: {
        ...createJediDto,
        role: 'JEDI',
      },
    });

    return padawan;
  }
}
