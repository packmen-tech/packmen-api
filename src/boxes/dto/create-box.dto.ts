import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { BoxSize } from '../entities/box.entity';

export class CreateBoxDto {
  @ApiProperty({ enum: BoxSize })
  @IsNotEmpty()
  @IsEnum(BoxSize)
  size: BoxSize;
}
