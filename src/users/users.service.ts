import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { RolesService } from 'src/roles/roles.service';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PurgedUser } from './interfaces/user.interface';
import { RoleType } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService
  ) {}

  private checkAuthorPermission(
    author: PurgedUser,
    user: Pick<PurgedUser, 'role'>
  ) {
    if (
      author.role === RoleType.ADMIN &&
      [RoleType.ROOT, RoleType.ADMIN].includes(user.role)
    ) {
      throw new UnauthorizedException(
        'Admin users cannot handle other admins or root users'
      );
    }
  }

  purgeUser(user: User): PurgedUser {
    const { id, email, role, name } = user;
    return { id, email, name, role: role.role };
  }

  async findByCredentials(
    email: string,
    verify: (user: User) => Promise<boolean>
  ): Promise<PurgedUser | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role']
    });

    if (!user || !(await verify(user))) {
      return null;
    }

    return this.purgeUser(user);
  }

  async findAll(): Promise<PurgedUser[]> {
    return (
      await this.userRepository.find({
        relations: ['role']
      })
    ).map(this.purgeUser);
  }

  async findById(id: number): Promise<PurgedUser | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role']
    });

    return user ? this.purgeUser(user) : null;
  }

  async findByEmail(email: string): Promise<PurgedUser | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role']
    });

    return user ? this.purgeUser(user) : null;
  }

  async create(user: CreateUserDto, author: PurgedUser): Promise<PurgedUser> {
    this.checkAuthorPermission(author, user);

    const role = await this.rolesService.findByRole(user.role);
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

    const createdUser = await this.userRepository.save({
      email: user.email,
      name: user.name,
      password: await argon2.hash(user.password),
      role
    });
    return this.purgeUser(createdUser);
  }

  async signup(user: CreateUserDto): Promise<PurgedUser> {
    if (user.role !== RoleType.OPERATOR) {
      throw new BadRequestException('Role must be OPERATOR');
    }

    const role = await this.rolesService.findByRole(user.role);
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

    const createdUser = await this.userRepository.save({
      email: user.email,
      name: user.name,
      password: await argon2.hash(user.password),
      role
    });
    return this.purgeUser(createdUser);
  }

  async remove(id: number, author: PurgedUser): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      this.checkAuthorPermission(author, user);
      await this.userRepository.delete(id);
    }
  }
}
