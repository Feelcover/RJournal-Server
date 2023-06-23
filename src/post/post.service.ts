import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPopular() {
    const queryBuilder = this.postRepository.createQueryBuilder();
    queryBuilder.orderBy('views', 'DESC');
    queryBuilder.limit(5);
    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

  search(searchPostDto: SearchPostDto) {
    const queryBuilder = this.postRepository.createQueryBuilder();
    queryBuilder.limit(10)
    
    return
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    post.views += 1;
    await this.postRepository.save(post);

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return this.postRepository.delete(id);
  }
}
