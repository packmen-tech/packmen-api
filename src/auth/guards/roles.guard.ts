import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PurgedUser } from 'src/users/interfaces/user.interface';

import { RoleType } from 'src/roles/entities/role.entity';

import constants from 'src/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      RoleType[] | undefined
    >(constants.decorators.roles, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: PurgedUser = request.user;
    return requiredRoles.some((role) => user.role === role);
  }
}
