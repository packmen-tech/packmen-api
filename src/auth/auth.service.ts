import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { PurgedUser } from 'src/users/interfaces/user.interface';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserLocal(email: string, password: string) {
    const user = await this.usersService.findByCredentials(
      email,
      async (user) => argon2.verify(user.password, password)
    );
    if (user) {
      return user;
    }
    return null;
  }

  async validateUserJwt(payload: any): Promise<PurgedUser | null> {
    const id = payload.sub;
    const email = payload.username;
    const user = await this.usersService.findById(id);

    if (user && user.email === email) {
      return user;
    }

    return null;
  }

  async login(user: PurgedUser) {
    const payload = { username: user.email, sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload)
    };
  }

  async signup(userDto: CreateUserDto) {
    const user = await this.usersService.signup(userDto);
    return this.login(user);
  }
}
