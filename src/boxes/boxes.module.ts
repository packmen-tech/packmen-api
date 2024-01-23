import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';
import { BoxesService } from './boxes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Box])],
  providers: [BoxesService],
  exports: [TypeOrmModule, BoxesService]
})
export class BoxesModule {}
