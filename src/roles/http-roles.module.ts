import { Module } from '@nestjs/common';

import { RolesController } from './roles.controller';
import { RolesModule } from './roles.module';

@Module({
  imports: [RolesModule],
  controllers: [RolesController]
})
export class HttpRolesModule {}
