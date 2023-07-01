import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      email,
      password,
    });

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  jwtGenerate(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    const { password, ...userData } = user;
    return {
      ...userData,
      access_token: this.jwtGenerate(userData),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...newUser } = await this.userService.create({
        email: createUserDto.email,
        password: createUserDto.password,
        fullName: createUserDto.fullName,
      });

      return {
        ...newUser,
        access_token: this.jwtGenerate(newUser),
      };
    } catch (err) {
      throw new ForbiddenException('Ошибка регистрации');
    }
  }
}
