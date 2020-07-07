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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Put('test')
  @UseGuards(AuthGuard())
  public test(): string {
    // Here we get user object from req.user
    // So we should create the custom decorator to retrieve it always so that we won't be having pain to get user
    return 'Tested';
  }
}
