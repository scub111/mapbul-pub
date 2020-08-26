import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { IUserDTO } from '@mapbul-pub/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Partial<IUserDTO> & { iat: number; exp: number }) {
    const response: Partial<IUserDTO> = {
      guid: payload.guid,
      email: payload.email,
      userTypeId: payload.userTypeId,
      registrationDate: payload.registrationDate,
      deleted: payload.deleted,
    };
    return response;
  }
}
