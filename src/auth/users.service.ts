import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: any): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(userId: number, updateUserDto: any): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }
}
