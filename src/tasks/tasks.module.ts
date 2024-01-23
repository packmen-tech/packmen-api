import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { BoxToTask } from './entities/boxToTask.entity';
import { ParcelToTask } from './entities/parcelToTask.entity';
import { BoxesModule } from 'src/boxes/boxes.module';
import { ParcelsModule } from 'src/parcels/parcels.module';
import { BusStopsModule } from 'src/bus-stops/bus-stops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, BoxToTask, ParcelToTask]),
    BoxesModule,
    ParcelsModule,
    BusStopsModule
  ],
  providers: [TasksService],
  exports: [TypeOrmModule, TasksService]
})
export class TasksModule {}
