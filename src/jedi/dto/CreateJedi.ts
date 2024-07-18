import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateJediDto {
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsString()
  readonly patronymic: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
