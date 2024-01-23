import { Module } from '@nestjs/common';
import { ParcelsModule } from './parcels.module';
import { ParcelsController } from './parcels.controller';

@Module({
  imports: [ParcelsModule],
  controllers: [ParcelsController]
})
export class HttpParcelsModule {}
