import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Введите корректный Email' })
  email: string;

  @MinLength(4, { message: 'Пароль должен быть длинной минимум 4 символа' })
  password?: string;

}
