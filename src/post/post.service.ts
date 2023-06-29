import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { getManager, Repository } from 'typeorm';
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

  async search(searchPostDto: SearchPostDto) {
    const queryBuilder = this.postRepository.createQueryBuilder('p');

    queryBuilder.limit(searchPostDto.limit || 0);
    queryBuilder.take(searchPostDto.take || 10);

    queryBuilder.setParameters({
      title: `%${searchPostDto.title}%`,
      article: `%${searchPostDto.article}%`,
      tags: `%${searchPostDto.tags}%`,
    });

    if (searchPostDto.views) {
      queryBuilder.orderBy('views', searchPostDto.views);
    }

    if (searchPostDto.title) {
      queryBuilder.andWhere(`p.title ILIKE :title`);
    }

    if (searchPostDto.article) {
      queryBuilder.andWhere(`p.article ILIKE :article`);
    }

    if (searchPostDto.tags) {
      queryBuilder.andWhere(`p.tags ILIKE :tags`);
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

  async findOne(id: number) {
    const entityManager = getManager();

    try {
      const post = await entityManager.transaction(
        async (transactionManager) => {
          const post = await transactionManager.findOne(Post, id);
          if (!post) {
            throw new NotFoundException('Пост не найден');
          }

          post.views += 1;
          await transactionManager.save(post);

          return post;
        },
      );

      return post;
    } catch (error) {
      throw new Error('Произошла ошибка при увеличении счетчика просмотров');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    const entityManager = getManager();

    try {
      await entityManager.transaction(async (transactionManager) => {
        post.views += 1;
        await transactionManager.save(post);
      });
    } catch (error) {
      throw new Error('Произошла ошибка при увеличении счетчика просмотров');
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
