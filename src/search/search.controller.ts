import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @Get()
  findAll(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
    @Query('search') search: string,
  ) {
    return this.searchService.findAll(startDate, endDate, search);
  }

  @Get('earthquakes.geojson')
  getGeoPoints(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
    @Query('search') search: string,
  ) {
    return this.searchService.getGeoPoints(startDate, endDate, search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchService.update(+id, updateSearchDto);
  }

  @Post('/sync')
  syncData() {
    return this.searchService.syncData();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchService.remove(+id);
  }
}
