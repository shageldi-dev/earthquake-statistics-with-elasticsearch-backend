import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Transform } from "class-transformer";
import { toNumber } from "../../helper/cast.helper";

export default class FindPlacesDto {
  @Transform(({ value }) => toNumber(value, { default: 20, min: 5, max: 200 }))
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsNotEmpty()
  page = 1;

  @IsString()
  @IsOptional()
  search = "";
}
