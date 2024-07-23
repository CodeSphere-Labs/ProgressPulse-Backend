import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/database/dto/User.dto';

export class CreatePadawanDto extends CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly jediId: number;

  @IsOptional()
  readonly feedback?: string[];
}
