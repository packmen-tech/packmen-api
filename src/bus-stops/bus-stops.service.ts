import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusStop } from './entities/bus-stop.entity';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
import { UpdateBusStopDto } from './dto/update-bus-stop.dto';

import busStops from './bus-stops.dummy';

@Injectable()
export class BusStopsService {
  constructor(
    @InjectRepository(BusStop)
    private readonly busStopsRepository: Repository<BusStop>
  ) {}

  async create(busStop: CreateBusStopDto) {
    return this.busStopsRepository.save({
      name: busStop.name,
      geoLocation: busStop.geoLocation as any
    });
  }

  async findAll() {
    return this.busStopsRepository.find();
  }

  async findOne(id: number) {
    return this.busStopsRepository.findOne({ where: { id } });
  }

  async update(id: number, busStop: UpdateBusStopDto): Promise<boolean> {
    const { affected } = await this.busStopsRepository.update(id, {
      geoLocation: busStop.geoLocation as any
    });
    return !!affected;
  }

  async remove(id: number) {
    await this.busStopsRepository.delete(id);
  }

  async populate() {
    const promises = [] as Promise<void>[];

    const insertRow = async (busStop: CreateBusStopDto) => {
      try {
        await this.create(busStop);
      } catch (e) {
        console.error(e);
      }
    };

    for (const busStop of busStops) {
      promises.push(insertRow(busStop));
    }

    await Promise.all(promises);
  }
}
