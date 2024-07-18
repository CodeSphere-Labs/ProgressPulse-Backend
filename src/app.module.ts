import { Module } from '@nestjs/common';
import { PadawanModule } from './padawan/padawan.module';
import { JediModule } from './jedi/jedi.module';

@Module({
  imports: [PadawanModule, JediModule],
})
export class AppModule {}
