
export class SearchPostDto {
  title?: string;

  article?: string;

  tags?: string;

  limit?: number;

  take?: number;

  views?: 'DESC' | 'ASC';
}
