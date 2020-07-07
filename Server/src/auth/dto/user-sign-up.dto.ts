import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
  password: string;
}
