import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { elasticsearchProviders } from '../database/elastic.providers';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService],
  imports: [...elasticsearchProviders],
})
export class PlacesModule {}
