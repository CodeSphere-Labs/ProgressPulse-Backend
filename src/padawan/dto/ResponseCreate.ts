import { Exclude, Expose } from 'class-transformer';

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
  isActive: boolean;
}
