import { Module } from '@nestjs/common';
import { JediService } from './jedi.service';
import { JediController } from './jedi.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [JediController],
  providers: [JediService, PrismaService],
})
export class JediModule {}
