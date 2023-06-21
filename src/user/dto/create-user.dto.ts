import { IsEmail, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный Email' })
  email: string;

  @MinLength(4, { message: 'Пароль должен быть длинной минимум 4 символа' })
  password: string;

  @Length(2, 30, {
    message: 'Имя должно быть от 2 до 30 символов',
  })
  fullName: string;
}
