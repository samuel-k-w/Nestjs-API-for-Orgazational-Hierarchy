// src/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const userExists = await this.usersService.findOne(username);
    if (userExists) {
      throw new ConflictException('Username already exists');
    }

    const newUser = this.userRepository.create({ username, password });
    return this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
