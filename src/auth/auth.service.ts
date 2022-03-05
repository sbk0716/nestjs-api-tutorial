import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * signup
   * 1. generate the password hash
   * 2. save the new user in the db
   * 3. execute signToken()
   * @param dto
   * @returns
   */
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // execute signToken()
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  /**
   * signin
   * 1. find the user by email
   * 2. compare password
   * 3. execute signToken()
   * @param dto
   * @returns
   */
  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.email);
  }

  /**
   * signToken
   * generate token with JwtService.signAsync()
   * @param userId
   * @param email
   * @returns
   */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    console.info('+++ this.config +++');
    console.info(this.config);
    const secret = this.config.get('JWT_SECRET');
    const apiConfig = this.config.get('api');
    const dbConfig = this.config.get('db');
    console.info('+++ apiConfig +++');
    console.info(apiConfig);
    console.info('+++ dbConfig +++');
    console.info(dbConfig);
    // generate token with JwtService.signAsync()
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );
    // decode token with JwtService.decode()
    const decodeResult = await this.jwt.decode(token)
    console.info('+++ decodeResult +++');
    console.info(decodeResult);
    return {
      access_token: token,
    };
  }
}
