import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private postRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.postRepository.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId },
      user: { id: 1 },

    });
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    const comment = await this.postRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.postRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    return this.postRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const comment = await this.postRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    return this.postRepository.delete(id);
  }
}
