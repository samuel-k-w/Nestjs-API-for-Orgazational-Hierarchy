import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EntityManager, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Create and save employee entity
    const employee = new Employee(createEmployeeDto);

    try {
      return await this.entityManager.save(employee);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create employee');
    }
  }

  async findAll() {
    return await this.employeesRepository.find();
  }

  async findOne(id: string) {
    return await this.employeesRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepository.findOneBy({ id });
    employee.email = updateEmployeeDto.email;
    return await this.entityManager.save(employee);
  }

  async remove(id: string) {
    await this.employeesRepository.delete(id);
  }
}
