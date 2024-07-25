import { Module } from '@nestjs/common';
import { PadawanModule } from './padawan/padawan.module';
import { JediModule } from './jedi/jedi.module';
import { YodaModule } from 'src/yoda/yoda.module';

@Module({
  imports: [PadawanModule, JediModule, YodaModule],
})
export class AppModule {}
