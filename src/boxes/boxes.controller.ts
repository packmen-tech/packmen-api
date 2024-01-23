import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { Box } from './entities/box.entity';
import { CreateBoxDto } from './dto/create-box.dto';

@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Get()
  findAll(): Promise<Box[]> {
    return this.boxesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Box> {
    const customer = await this.boxesService.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Box #${id} not found`);
    }

    return customer;
  }

  @Post()
  create(@Body() body: CreateBoxDto): Promise<Box> {
    return this.boxesService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.boxesService.remove(id);
  }
}
