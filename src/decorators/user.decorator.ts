import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PurgedUser } from 'src/users/interfaces/user.interface';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as PurgedUser;
  }
);
