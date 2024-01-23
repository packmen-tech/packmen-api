import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { Parcel } from './entities/parcels.entity';

@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Get()
  findAll(): Promise<Parcel[]> {
    return this.parcelsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Parcel> {
    const customer = await this.parcelsService.findById(id);

    if (!customer) {
      throw new NotFoundException(`Parcel #${id} not found`);
    }

    return customer;
  }

  @Get('code/:id')
  async findByCode(@Param('code') code: string): Promise<Parcel> {
    const customer = await this.parcelsService.findByCode(code);

    if (!customer) {
      throw new NotFoundException(`Parcel #${code} not found`);
    }

    return customer;
  }

  @Post()
  create(@Body() body: CreateParcelDto): Promise<Parcel> {
    return this.parcelsService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.parcelsService.remove(id);
  }
}
