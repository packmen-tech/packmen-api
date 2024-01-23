import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './entities/parcels.entity';
import { ParcelsService } from './parcels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelsService],
  exports: [TypeOrmModule, ParcelsService]
})
export class ParcelsModule {}
