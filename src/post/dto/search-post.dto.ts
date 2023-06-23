import { IsString } from 'class-validator';

export class SearchPostDto {
  title?: string;

  article?: string;

  tag?: string;

  limit?: number;

  take?: number;

  views?: 'DESC' | 'ASC';
}
