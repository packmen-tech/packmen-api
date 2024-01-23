import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PurgedUser } from 'src/users/interfaces/user.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from './decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: PurgedUser) {
    return this.authService.login(user as PurgedUser);
  }

  @Public()
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Get('profile')
  getProfile(@User() user: PurgedUser) {
    return user;
  }
}
