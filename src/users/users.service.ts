// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
