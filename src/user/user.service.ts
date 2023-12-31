import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.userRepository.findOne(cond);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async search(searchUserDto: SearchUserDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('u');

    queryBuilder.limit(searchUserDto.limit || 0);
    queryBuilder.take(searchUserDto.take || 10);

    queryBuilder.setParameters({
      fullName: `%${searchUserDto.fullName}%`,
      email: `%${searchUserDto.email}%`,
    });

    if (searchUserDto.fullName) {
      queryBuilder.andWhere(`u.fullName ILIKE :fullName`);
    }

    if (searchUserDto.email) {
      queryBuilder.andWhere(`u.email ILIKE :email`);
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

}
