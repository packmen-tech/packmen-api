import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStop } from './entities/bus-stop.entity';
import { BusStopsService } from './bus-stops.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusStop])],
  providers: [BusStopsService],
  exports: [TypeOrmModule, BusStopsService]
})
export class BusStopsModule {}
