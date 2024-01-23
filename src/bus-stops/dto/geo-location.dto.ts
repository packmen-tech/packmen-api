import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { GeoLocation } from 'src/types';

export class GeoLocationDto implements GeoLocation {
  @ApiProperty()
  @IsDefined()
  readonly lat: number;

  @ApiProperty()
  @IsDefined()
  readonly lng: number;
}
