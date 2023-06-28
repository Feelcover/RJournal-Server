import { Injectable } from '@nestjs/common';
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
    const { password, ...user } = await this.userService.create(createUserDto);

    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }
}
