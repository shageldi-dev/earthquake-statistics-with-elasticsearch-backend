import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { elasticsearchProviders } from 'src/database/elastic.providers';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [...elasticsearchProviders],
})
export class SearchModule {}
