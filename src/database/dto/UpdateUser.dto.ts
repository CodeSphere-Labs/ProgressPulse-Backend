import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @Optional()
  @ApiProperty({ required: false })
  readonly first_name?: string;

  @Optional()
  @ApiProperty({ required: false })
  readonly last_name?: string;

  @Optional()
  @ApiProperty({ required: false })
  readonly patronymic?: string;

  @Optional()
  @ApiProperty({ required: false })
  readonly email?: string;

  @Optional()
  @ApiProperty({ required: false })
  readonly password?: string;
}
