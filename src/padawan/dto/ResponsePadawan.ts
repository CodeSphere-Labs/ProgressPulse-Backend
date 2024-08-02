import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseUserDto } from 'src/database/dto/ResponseUser.dto';
import { ResponseJediDto } from 'src/jedi/dto/ResponseJedi';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ResponsePadawanDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  feedback: string[];

  @Expose()
  @ApiProperty()
  @Type(() => ResponseJediDto)
  user: ResponseUserDto;

  @Expose()
  @ApiProperty()
  @Type(() => ResponseJediDto)
  jedi?: ResponseJediDto;
}
