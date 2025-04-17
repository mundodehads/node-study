import {
  IsString,
  IsDate,
  IsArray,
  IsOptional,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateMeetingDto {
  @IsString()
  title!: string;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsArray()
  @IsString({ each: true })
  participants!: string[];

  @IsOptional()
  @IsString()
  transcript?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
