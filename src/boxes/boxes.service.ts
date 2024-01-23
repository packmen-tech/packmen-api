import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Box } from './entities/box.entity';
import { CreateBoxDto } from './dto/create-box.dto';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Box)
    private readonly boxesRepository: Repository<Box>
  ) {}

  async create(box: CreateBoxDto) {
    return this.boxesRepository.save(box);
  }

  async findAll() {
    return this.boxesRepository.find();
  }

  async findOne(id: number) {
    return this.boxesRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.boxesRepository.delete(id);
  }
}
