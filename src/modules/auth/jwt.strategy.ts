import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // não ignorar o token quando ele estiver expirado
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  // payload
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
