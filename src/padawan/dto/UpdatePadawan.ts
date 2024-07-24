import { Optional } from '@nestjs/common';
import { UpdateUserDto } from 'src/database/dto/UpdateUser.dto';

export class UpdatePadawanDto extends UpdateUserDto {
  @Optional()
  readonly feedback?: string[];

  @Optional()
  readonly jediId?: number;
}
