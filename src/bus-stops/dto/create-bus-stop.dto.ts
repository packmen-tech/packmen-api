import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsDefined } from 'class-validator';
import { GeoLocationDto } from './geo-location.dto';

export class CreateBusStopDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @ApiProperty()
  @IsDefined()
  readonly geoLocation: GeoLocationDto;
}
