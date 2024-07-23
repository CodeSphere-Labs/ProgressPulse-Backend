import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseUserDto } from 'src/database/dto/ResponseUser.dto';
import { ResponseJediDto } from 'src/jedi/dto/ResponseJedi';

@Exclude()
export class ResponsePadawanDto {
  @Expose()
  id: number;

  @Expose()
  feedback: string[];

  @Expose()
  @Type(() => ResponseJediDto)
  user: ResponseUserDto;

  @Expose()
  @Type(() => ResponseJediDto)
  jedi: ResponseJediDto;
}
