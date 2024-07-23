import { Optional } from '@nestjs/common';

export class UpdatePadawanDto {
  @Optional()
  readonly first_name?: string;

  @Optional()
  readonly last_name?: string;

  @Optional()
  readonly patronymic?: string;

  @Optional()
  readonly feedback?: string[];

  @Optional()
  readonly email?: string;

  @Optional()
  readonly jediId?: number;
}
