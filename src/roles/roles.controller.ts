import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role, RoleType } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Role> {
    const role = await this.rolesService.findById(id);

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  @Get('role/:role')
  async findByRole(@Param('role') roleType: RoleType): Promise<Role> {
    const role = await this.rolesService.findByRole(roleType);

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }
}
