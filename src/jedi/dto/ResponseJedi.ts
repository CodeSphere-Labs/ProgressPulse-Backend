import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponsePadawanDto } from 'src/padawan/dto/ResponsePadawan';

@Exclude()
export class ResponseJediDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  first_name: string;

  @Expose()
  @ApiProperty()
  last_name: string;

  @Expose()
  @ApiProperty()
  patronymic: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  role: string;

  @Expose()
  @Type(() => ResponsePadawanDto)
  padawans: ResponsePadawanDto;
}
