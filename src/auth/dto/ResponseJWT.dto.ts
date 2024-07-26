import { Expose } from 'class-transformer';

export class ResponseJWTDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
