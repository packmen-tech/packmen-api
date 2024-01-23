import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { GeoLocationDto } from './geo-location.dto';

export class UpdateBusStopDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly geoLocation: GeoLocationDto;
}
