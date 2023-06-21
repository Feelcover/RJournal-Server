import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  article: string;

  @IsArray()
  tags: string[];
}
