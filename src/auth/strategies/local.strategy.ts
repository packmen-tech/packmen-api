import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUserLocal(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
