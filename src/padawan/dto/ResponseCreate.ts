import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseJediDto } from 'src/jedi/dto/ResponseJedi';

@Exclude()
export class ResponseCreatePadawanDto {
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
  feedback: string[];

  @Expose()
  role: string;

  @Expose()
  @Type(() => ResponseJediDto)
  jedi: ResponseJediDto;
}
