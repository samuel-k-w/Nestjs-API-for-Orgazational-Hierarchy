// src/auth/auth.controller.ts

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('signin')
  async signin(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.authService.validateUser(
      createUserDto.username,
      createUserDto.password,
    );
    return this.authService.login(user);
  }
}
