import { CreateJediDto } from './dto/CreateJedi';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JediService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    const jedis = this.prisma.jedi.findMany({
      include: {
        padawans: true,
      },
    });

    return jedis;
  }

  create(createJediDto: CreateJediDto) {
    const padawan = this.prisma.jedi.create({
      data: createJediDto,
    });

    return padawan;
  }
}
