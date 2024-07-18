import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseJediDto } from 'src/jedi/dto/ResponseJedi';

@Exclude()
export class ResponsePadawanDto {
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
  isActive: boolean;

  @Expose()
  @Type(() => ResponseJediDto)
  jedi: ResponseJediDto;
}
