import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { Task, TaskType } from './entities/task.entity';
import { BoxTaskAction, BoxToTask } from './entities/boxToTask.entity';
import { Box, BoxSize } from 'src/boxes/entities/box.entity';
import { BoxesService } from 'src/boxes/boxes.service';
import { ParcelsService } from 'src/parcels/parcels.service';
import { Parcel, ParcelSize } from 'src/parcels/entities/parcels.entity';
import { ParcelToTask } from './entities/parcelToTask.entity';
import { BusStopsService } from 'src/bus-stops/bus-stops.service';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { PurgedUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(BoxToTask)
    private readonly boxToTaskRepository: Repository<BoxToTask>,
    @InjectRepository(ParcelToTask)
    private readonly parcelToTaskRepository: Repository<ParcelToTask>,
    private readonly boxesService: BoxesService,
    private readonly parcelsService: ParcelsService,
    private readonly busStopsService: BusStopsService
  ) {}

  async findAll(operatorId: number) {
    return this.tasksRepository.find({
      where: {
        time: Between(startOfDay(new Date()), endOfDay(new Date())),
        operator: { id: operatorId }
      },
      relations: [
        'boxes',
        'parcels',
        'boxes.box',
        'parcels.fromBox',
        'parcels.toBox',
        'parcels.parcel',
        'location'
      ],
      order: {
        time: 'ASC'
      }
    });
  }

  async findByType(type: TaskType, operatorId: number) {
    return this.tasksRepository.find({
      where: {
        time: Between(startOfDay(new Date()), endOfDay(new Date())),
        operator: { id: operatorId },
        type
      },
      relations: [
        'boxes',
        'parcels',
        'boxes.box',
        'parcels.fromBox',
        'parcels.toBox',
        'parcels.parcel',
        'location'
      ]
    });
  }

  async findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: [
        'boxes',
        'parcels',
        'boxes.box',
        'parcels.fromBox',
        'parcels.toBox',
        'parcels.parcel',
        'location'
      ]
    });
  }

  async remove(id: number) {
    await this.tasksRepository.delete(id);
  }

  async scanBox(taskId: number, boxId: number, done: boolean) {
    await this.boxToTaskRepository.update(
      {
        box: { id: boxId },
        task: { id: taskId }
      },
      {
        done
      }
    );
  }

  async scanParcel(taskId: number, parcelCode: string, done: boolean) {
    const parcel = await this.parcelsService.findByCode(parcelCode);

    if (!parcel) {
      throw new Error(`Parcel with code ${parcelCode} not found`);
    }

    await this.parcelToTaskRepository.update(
      {
        parcel,
        task: { id: taskId }
      },
      {
        done
      }
    );
  }

  async completeTask(taskId: number) {
    await this.tasksRepository.update(
      {
        id: taskId
      },
      {
        done: true
      }
    );
  }

  async populate(user: PurgedUser) {
    const getRandomLocation: () => Promise<BusStop> = async () => {
      const locations = await this.busStopsService.findAll();
      return locations[Math.floor(Math.random() * locations.length)];
    };
    const location = await getRandomLocation();

    const getRandomTimeOfToday: () => Date = () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    };

    function getRandomBoxSize(): BoxSize {
      const sizes = [BoxSize.SMALL, BoxSize.MEDIUM, BoxSize.LARGE];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function getRandomParcelSize(): ParcelSize {
      const sizes = [ParcelSize.SMALL, ParcelSize.MEDIUM, ParcelSize.LARGE];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }

    const getRandomBox: () => Promise<Box> = async () =>
      this.boxesService.create({
        size: getRandomBoxSize()
      });

    const getRandomCarrier: () => 'DHL' | 'UPD' | 'GLS' = () =>
      ['DHL', 'UPD', 'GLS'][Math.floor(Math.random() * 3)] as any;

    const getRandomParcelCode: (carrier: string) => string = (carrier) =>
      carrier + Math.floor(Math.random() * 10000);

    const getRandomParcel: () => Promise<Parcel> = async () => {
      const carrier = getRandomCarrier();
      return this.parcelsService.create({
        code: getRandomParcelCode(carrier),
        carrier,
        addressFrom: 'From address',
        addressTo: 'To address',
        size: getRandomParcelSize(),
        priority: 1,
        isFragile: Math.random() > 0.9
      });
    };

    const getRandomBoxToTask: (
      action?: BoxTaskAction
    ) => Promise<BoxToTask> = async (action) =>
      this.boxToTaskRepository.save({
        box: await getRandomBox(),
        action:
          action ||
          (Math.random() > 0.5
            ? BoxTaskAction.OFF_LOAD
            : BoxTaskAction.ON_LOAD),
        done: false
      });

    const getRandomParcelToTask: () => Promise<ParcelToTask> = async () =>
      this.parcelToTaskRepository.save({
        parcel: await getRandomParcel(),
        fromBox: await getRandomBox(),
        toBox: await getRandomBox(),
        done: false
      });

    const getRandomBoxTask = async (operatorId: number) => {
      return {
        type: TaskType.BOX,
        time: getRandomTimeOfToday(),
        title: 'OffLoading & OnLoading boxes',
        operator: { id: operatorId },
        done: false,
        boxes: [
          await getRandomBoxToTask(),
          await getRandomBoxToTask(),
          ...(Math.random() > 0.5 ? [await getRandomBoxToTask()] : [])
        ],
        location
      };
    };

    const getRandomBikeTask = async (operatorId: number) => {
      return {
        type: TaskType.BYCICLE,
        time: getRandomTimeOfToday(),
        title: 'Bike Delivery',
        operator: { id: operatorId },
        done: false,
        boxes: [
          await getRandomBoxToTask(BoxTaskAction.ON_LOAD),
          await getRandomBoxToTask(BoxTaskAction.ON_LOAD),
          ...(Math.random() > 0.5
            ? [await getRandomBoxToTask(BoxTaskAction.ON_LOAD)]
            : [])
        ],
        location
      };
    };

    const getRandomParcelTask = async (operatorId: number) => {
      return {
        type: TaskType.PARCEL,
        time: getRandomTimeOfToday(),
        title: 'Sorting Parcels',
        operator: { id: operatorId },
        done: false,
        parcels: [
          await getRandomParcelToTask(),
          await getRandomParcelToTask(),
          ...(Math.random() > 0.3 ? [await getRandomParcelToTask()] : []),
          ...(Math.random() > 0.4 ? [await getRandomParcelToTask()] : []),
          ...(Math.random() > 0.5 ? [await getRandomParcelToTask()] : [])
        ],
        location
      };
    };

    const getRandomMoveTask = async (operatorId: number) => {
      return {
        type: TaskType.MOVE,
        time: getRandomTimeOfToday(),
        title: 'Move to hub',
        operator: { id: operatorId },
        done: false,
        location
      };
    };

    const tasks = this.tasksRepository.create([
      await getRandomMoveTask(user.id),
      await getRandomBoxTask(user.id),
      await getRandomBoxTask(user.id),
      await getRandomParcelTask(user.id),
      await getRandomBikeTask(user.id),
      await getRandomBoxTask(user.id),
      await getRandomParcelTask(user.id)
    ]);
    await this.tasksRepository.save(tasks);
  }
}
