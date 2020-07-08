import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {  }

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  public async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<{ success: string }> {
    await this.authService.signUp(userSignUpDto);
    return { success: 'User created successfully' };
  }

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    const acknowledgement = await this.authService.signIn(userSignInDto);
    return acknowledgement;
  }
}
