import { IsString } from 'class-validator';

enum PostViewsEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class SearchPostDto {
  @IsString()
  title: string;

  @IsString()
  article: string;

  @IsString()
  tags: string;

  limit: number;

  take: number;

  views: PostViewsEnum;
}
