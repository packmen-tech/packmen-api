import { Module } from '@nestjs/common';
import { BoxesModule } from './boxes.module';
import { BoxesController } from './boxes.controller';

@Module({
  imports: [BoxesModule],
  controllers: [BoxesController]
})
export class HttpBoxesModule {}
