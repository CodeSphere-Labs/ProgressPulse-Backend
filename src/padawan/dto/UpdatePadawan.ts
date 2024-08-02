import { Optional } from '@nestjs/common';
import { UpdateUserDto } from 'src/database/dto/UpdateUser.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePadawanDto extends UpdateUserDto {
  @Optional()
  @ApiProperty({ required: false })
  readonly feedback?: string[];

  @ApiProperty({ required: false })
  @Optional()
  readonly jediId?: number;
}
