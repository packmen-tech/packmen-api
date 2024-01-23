import { Module } from '@nestjs/common';
import { BusStopsModule } from './bus-stops.module';
import { BusStopsController } from './bus-stops.controller';

@Module({
  imports: [BusStopsModule],
  controllers: [BusStopsController]
})
export class HttpBusStopsModule {}
