import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Request
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/roles/entities/role.entity';
import { PurgedUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  @Roles(RoleType.ROOT, RoleType.ADMIN)
  @Post()
  create(@Request() req: ExpressRequest, @Body() createUserDto: CreateUserDto) {
    const user = req.user as PurgedUser;
    return this.usersService.create(createUserDto, user);
  }

  @Roles(RoleType.ROOT, RoleType.ADMIN)
  @Delete(':id')
  remove(@Request() req: ExpressRequest, @Param('id') id: number) {
    const user = req.user as PurgedUser;
    return this.usersService.remove(id, user);
  }
}
