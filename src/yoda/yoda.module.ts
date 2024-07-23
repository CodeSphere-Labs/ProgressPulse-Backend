import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { YodaController } from 'src/yoda/yoda.controller';
import { YodaService } from 'src/yoda/yoda.service';

@Module({
  controllers: [YodaController],
  providers: [YodaService, PrismaService],
})
export class YodaModule {}
