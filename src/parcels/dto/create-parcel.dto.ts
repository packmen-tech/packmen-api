import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEnum, IsDefined } from 'class-validator';
import { ParcelSize } from '../entities/parcels.entity';

export class CreateParcelDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10)
  readonly code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly carrier: string;

  @ApiProperty()
  @IsEnum(ParcelSize)
  readonly size: ParcelSize;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly addressFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly addressTo: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly priority: number;

  @ApiProperty()
  @IsDefined()
  readonly isFragile: boolean;
}
