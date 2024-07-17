import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Position])],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
