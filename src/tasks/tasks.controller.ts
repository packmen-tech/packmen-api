import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  Post,
  Body,
  Patch
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskType } from './entities/task.entity';
import { User } from 'src/decorators/user.decorator';
import { PurgedUser } from 'src/users/interfaces/user.interface';
import { DoneDto } from './dto/done.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@User() user: PurgedUser): Promise<Task[]> {
    return this.tasksService.findAll(user.id);
  }

  @Get('type/:type')
  findByType(
    @User() user: PurgedUser,
    @Param('type') type: TaskType
  ): Promise<Task[]> {
    return this.tasksService.findByType(type, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    const customer = await this.tasksService.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return customer;
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Post(':id/is-done')
  completeTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.completeTask(id);
  }

  @Patch(':id/scanned-boxes/:boxId')
  scanBox(
    @Param('id') id: number,
    @Param('boxId') boxId: number,
    @Body() done: DoneDto
  ): Promise<void> {
    return this.tasksService.scanBox(id, boxId, done.done);
  }

  @Patch(':id/scanned-parcels/:parcelCode')
  scanParcel(
    @Param('id') id: number,
    @Param('parcelCode') parcelCode: string,
    @Body() done: DoneDto
  ): Promise<void> {
    return this.tasksService.scanParcel(id, parcelCode, done.done);
  }

  @Post('populate')
  populate(@User() user: PurgedUser): Promise<void> {
    return this.tasksService.populate(user);
  }
}
