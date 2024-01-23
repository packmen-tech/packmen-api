import { SetMetadata } from '@nestjs/common';
import constants from 'src/common/constants';
import { RoleType } from 'src/roles/entities/role.entity';

export const Roles = (...roles: RoleType[]) =>
  SetMetadata(constants.decorators.roles, roles);
