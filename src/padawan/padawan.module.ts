import { Module } from '@nestjs/common';
import { PadawanService } from './padawan.service';
import { PadawanController } from './padawan.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PadawanController],
  providers: [PadawanService, PrismaService],
})
export class PadawanModule {}
