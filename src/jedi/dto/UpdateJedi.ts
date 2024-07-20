import { Optional } from '@nestjs/common';

export class UpdateJediDto {
  @Optional()
  readonly first_name?: string;

  @Optional()
  readonly last_name?: string;

  @Optional()
  readonly patronymic?: string;

  @Optional()
  readonly email?: string;

  @Optional()
  readonly password?: string;
}
