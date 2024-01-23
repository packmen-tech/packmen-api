import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcel } from './entities/parcels.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelsRepository: Repository<Parcel>
  ) {}

  async create(parcel: CreateParcelDto) {
    return this.parcelsRepository.save(parcel);
  }

  async findAll() {
    return this.parcelsRepository.find();
  }

  async findById(id: number) {
    return this.parcelsRepository.findOne({ where: { id } });
  }

  async findByCode(code: string) {
    return this.parcelsRepository.findOne({ where: { code } });
  }

  async remove(id: number) {
    await this.parcelsRepository.delete(id);
  }
}
