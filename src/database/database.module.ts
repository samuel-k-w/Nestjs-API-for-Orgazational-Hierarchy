import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/users/entity/user.entity';
import { Position } from 'src/positions/entities/position.entity';
import { Photo } from 'src/employees/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        username: configService.getOrThrow('POSTGRES_USERNAME'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        entities: [Position, Employee, User, Photo],
        synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
