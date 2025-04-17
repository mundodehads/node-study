import { IsString } from "class-validator";

export class UpdateTranscriptDto {
  @IsString()
  transcript: string;
}
