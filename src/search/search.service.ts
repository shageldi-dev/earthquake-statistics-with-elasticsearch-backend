import { Injectable } from "@nestjs/common";
import { CreateSearchDto } from "./dto/create-search.dto";
import { UpdateSearchDto } from "./dto/update-search.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { dashboardQuery, geoPointsQuery } from "./elk-query/elk.query";
import axios from "axios";

@Injectable()
export class SearchService {
  constructor(private readonly elService: ElasticsearchService) {}
  create(createSearchDto: CreateSearchDto) {
    return "This action adds a new search";
  }

  findAll(startDate: string, endDate: string, search: string) {
    console.log(startDate, endDate);
    return this.elService.search({
      index: "earthquakes",
      ...dashboardQuery(startDate, endDate, search),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  async getGeoPoints(startDate: string, endDate: string, search: string) {
    const data = await this.elService.search({
      index: "earthquakes",
      ...geoPointsQuery(startDate, endDate, search),
    });

    const result = [];
    data.hits.hits.forEach((hit) => {
      // console.log(hit);
      result.push({
        type: "Feature",
        properties: {
          name: hit._source["place"],
          amenity: hit._source["type"],
          popupContent: `${hit._source["place"]}, magnitude: ${hit._source["mag"]}, depth: ${hit._source["depth"]}`,
        },
        geometry: {
          type: "Point",
          coordinates: [
            hit._source["coordinates"].lon,
            hit._source["coordinates"].lat,
          ],
        },
      });
    });
    return {
      type: "FeatureCollection",
      features: result,
    };
  }

  async syncData() {
    const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`;
    console.log("Loading Application...");
    let results: any;

    const indexData = async () => {
      try {
        console.log("Retrieving data from the USGS API");

        const EARTHQUAKES = await axios.get(`${URL}`, {
          headers: {
            "Content-Type": ["application/json", "charset=utf-8"],
          },
        });

        console.log("Data retrieved!");

        results = EARTHQUAKES.data.features;

        console.log("Indexing data...");

        results.forEach(async (result) => {
          const earthquakeObject = {
            place: result.properties.place,
            time: result.properties.time,
            tz: result.properties.tz,
            url: result.properties.url,
            detail: result.properties.detail,
            felt: result.properties.felt,
            cdi: result.properties.cdi,
            alert: result.properties.alert,
            status: result.properties.status,
            tsunami: result.properties.tsunami,
            sig: result.properties.sig,
            net: result.properties.net,
            code: result.properties.code,
            sources: result.properties.sources,
            nst: result.properties.nst,
            dmin: result.properties.dmin,
            rms: result.properties.rms,
            mag: result.properties.mag,
            magType: result.properties.magType,
            type: result.properties.type,
            longitude: result.geometry.coordinates[0],
            latitude: result.geometry.coordinates[1],
            depth: result.geometry.coordinates[2],
          };
          await this.elService.index({
            index: "earthquakes",
            id: results.id,
            body: earthquakeObject,
            pipeline: "earthquake_pipeline",
          });
        });

        if (EARTHQUAKES.data.length) {
          indexData();
        } else {
          console.log("Data has been indexed successfully!");
        }
      } catch (err) {
        console.log(err);
      }

      console.log("Preparing for the next round of indexing...");
    };
    await indexData();
    return "Success";
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }

  getPlaces() {
    return this.elService.search({
      index: "earthquakes",
    });
  }
}
