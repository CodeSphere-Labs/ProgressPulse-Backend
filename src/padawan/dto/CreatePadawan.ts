import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/database/dto/User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePadawanDto extends CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ nullable: true })
  readonly jediId: number;

  @IsOptional()
  @ApiProperty()
  readonly feedback?: string[];
}
