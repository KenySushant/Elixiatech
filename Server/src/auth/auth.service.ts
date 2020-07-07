import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {  }

  public async signUp(userSignUpDto: UserSignUpDto): Promise<IUser> {
    const user = await this.userRepository.signUp(userSignUpDto);
    return user;
  }

  public async signIn(userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(userSignInDto);
    const payload: IJwtPayload = { username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, { subject: user._id.toString() });
    return { accessToken };
  }
}
