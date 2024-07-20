import { Exclude, Expose, Type } from 'class-transformer';
import { ResponsePadawanDto } from 'src/padawan/dto/ResponsePadawan';

@Exclude()
export class ResponseJediDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  patronymic: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => ResponsePadawanDto)
  Padawan: ResponsePadawanDto;
}
