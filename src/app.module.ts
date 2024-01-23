import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import config from './common/config';

import { HttpUsersModule } from './users/http-users.module';
import { TypeOrmFilter } from './filters/typeorm.filter';
import { HttpAuthModule } from './auth/http-auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HttpRolesModule } from './roles/http-roles.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { HttpBusStopsModule } from './bus-stops/http-bus-stops.module';
import { HttpParcelsModule } from './parcels/http-parcels.module';
import { HttpBoxesModule } from './boxes/http-boxes.module';
import { HttpTasksModule } from './tasks/http-tasks.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: config.nodeEnv !== 'production'
    }),
    TypeOrmModule.forRoot({
      type: config.database.type as any,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    HttpUsersModule,
    HttpAuthModule,
    HttpRolesModule,
    HttpBusStopsModule,
    HttpParcelsModule,
    HttpBoxesModule,
    HttpTasksModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmFilter
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  controllers: [AuthController]
})
export class AppModule {}
