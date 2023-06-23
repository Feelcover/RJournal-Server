import { IsString } from 'class-validator';


export class SearchPostDto {
  @IsString()
  title?: string;

  @IsString()
  article?: string;

  @IsString()
  tag?: string;

  limit?: number;

  take?: number;

  views?: "DESC" | "ASC";
}