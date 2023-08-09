import { Injectable, Query } from "@nestjs/common";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import FindPlacesDto from "./dto/find-places.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class PlacesService {
  constructor(private readonly elService: ElasticsearchService) {}
  create(createPlaceDto: CreatePlaceDto) {
    return "This action adds a new place";
  }

  async findAll(payload: FindPlacesDto) {
    let query: any = { match_all: {} };
    if (payload.search && payload.search.trim().length > 0) {
      query = {
        match: {
          place: payload.search,
        },
      };
    }
    const result = await this.elService.search({
      index: "earthquakes",
      track_total_hits: true,
      query: query,
      size: payload.limit,
      from: payload.limit * (payload.page - 1),
      fields: ["*"],
    });
    const pageCount = result.hits.total["value"];
    return {
      pageCount: Math.ceil(Number(pageCount) / payload.limit),
      ...result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: string) {
    return this.elService.delete({
      index: "earthquakes",
      id: id,
    });
  }
}
