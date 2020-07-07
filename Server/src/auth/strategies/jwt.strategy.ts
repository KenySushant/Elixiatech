import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TopSecret'
    });
  }

  public async validate(payload: IJwtPayload): Promise<IUser> {
    const { username } = payload;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
