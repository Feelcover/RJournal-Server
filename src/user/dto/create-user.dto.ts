import { IsEmail, Length, MinLength } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/uniq-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный Email' })
  @UniqueOnDatabase(User, { message: 'Такая почта уже существует'})
  email: string;

  @MinLength(4, { message: 'Пароль должен быть длинной минимум 4 символа' })
  password: string;

  @Length(2, 30, {
    message: 'Имя должно быть от 2 до 30 символов',
  })
  fullName: string;
}
