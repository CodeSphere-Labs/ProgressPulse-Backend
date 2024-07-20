import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseCreateJediDto {
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
}
