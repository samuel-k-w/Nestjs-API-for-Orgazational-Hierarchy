import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nestjs API for organization hierarchy employee registration!';
  }
}
