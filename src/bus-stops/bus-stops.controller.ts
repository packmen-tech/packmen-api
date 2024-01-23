import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException
} from '@nestjs/common';
import { BusStopsService } from './bus-stops.service';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
import { UpdateBusStopDto } from './dto/update-bus-stop.dto';
import { BusStop } from './entities/bus-stop.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/roles/entities/role.entity';

@Controller('bus-stops')
export class BusStopsController {
  constructor(private readonly busStopsService: BusStopsService) {}

  @Get()
  findAll(): Promise<BusStop[]> {
    return this.busStopsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BusStop> {
    const customer = await this.busStopsService.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Bus stop #${id} not found`);
    }

    return customer;
  }

  @Post()
  create(@Body() body: CreateBusStopDto): Promise<BusStop> {
    return this.busStopsService.create(body);
  }

  @Put(':id')
  async replace(
    @Param('id') id: number,
    @Body() body: CreateBusStopDto
  ): Promise<void> {
    const updated = await this.busStopsService.update(id, body);

    if (!updated) {
      throw new NotFoundException(`Bus stop #${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateBusStopDto
  ): Promise<void> {
    const updated = await this.busStopsService.update(id, body);

    if (!updated) {
      throw new NotFoundException(`Bus stop #${id} not found`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.busStopsService.remove(id);
  }

  @Roles(RoleType.ROOT)
  @Post('populate')
  popoulate(): Promise<void> {
    return this.busStopsService.populate();
  }
}
