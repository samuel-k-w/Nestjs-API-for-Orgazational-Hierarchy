// src/users/users.controller.ts

import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
