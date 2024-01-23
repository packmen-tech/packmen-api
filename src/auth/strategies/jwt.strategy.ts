import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import config from '../../common/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: config.security.jwt.issuer,
      secretOrKey: config.security.jwt.secret
    } as StrategyOptions);
  }

  async validate(payload: any) {
    const user = this.authService.validateUserJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
