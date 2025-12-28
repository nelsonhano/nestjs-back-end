import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
}
