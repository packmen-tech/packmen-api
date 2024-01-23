import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class DoneDto {
  @ApiProperty()
  @IsDefined()
  readonly done: boolean;
}
