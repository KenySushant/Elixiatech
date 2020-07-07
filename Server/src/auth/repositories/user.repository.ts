import * as util from 'util';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { IUser } from '../interfaces/user.interface';
import { UserSignUpDto } from '../dto/user-sign-up.dto';
import { UserSignInDto } from '../dto/user-sign-in.dto';

export class UserRepository {
  constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) { }

  public async signUp(userSignUpDto: UserSignUpDto): Promise<IUser> {
    const {
      username,
      password
    } = userSignUpDto;

    const encryptedData = await this.encryptPassword(password);

    const user = new this.UserModel();

    user.username = username;
    user.passwordHash = encryptedData.passwordHash;
    user.salt = encryptedData.salt;

    try {
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`User with the User Name: '${username}' already exists`);
      }
      throw error;
    }
  }

  public async signIn(userSignInDto: UserSignInDto): Promise<IUser> {
    const {
      username,
      password
    } = userSignInDto;

    const user = await this.UserModel.findOne({ username });

    if (!user) throw new NotFoundException(`Cannot find User with an username '${username}'`);

    const validPassword = await this.validatePasswordWithSaltAndHash(
      password,
      user.salt,
      user.passwordHash
    );

    if (!validPassword) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }

  public async findByUsername(username: string): Promise<IUser> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  private async encryptPassword(password: string, salt?: string): Promise<{ passwordHash, salt?}> {
    if (!salt) {
      salt = crypto.randomBytes(30).toString('hex');
      const hash = await util.promisify(crypto.pbkdf2)(password, salt, 100, 50, 'sha512');
      return { passwordHash: hash.toString('hex'), salt };
    }

    const passwordHash = await util.promisify(crypto.pbkdf2)(password, salt, 100, 50, 'sha512');
    return { passwordHash };
  }

  private async validatePasswordWithSaltAndHash(
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    const { passwordHash } = await this.encryptPassword(password, salt);
    return passwordHash.toString('hex') === hash;
  }
}
