import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { EntityManager, Repository, TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { count } from 'console';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly entityManager: EntityManager,
  ) {}

  // CREATE
  async create({ name, description, reportsTo, leaderId }: CreatePositionDto) {
    // const employee = await this.employeeRepository.findOneBy({ id: leaderId });
    const count: any = this.positionRepository.count();
    let positionParent = null;

    count > 0
      ? (positionParent = await this.positionRepository.findOneBy({
          id: reportsTo,
        }))
      : (positionParent = true);

    let position = null;

    if (positionParent) {
      position = new Position({ name, description, reportsTo, leaderId });
      return await this.entityManager.save(position);
    } else
      throw new NotFoundException(`position with ID ${reportsTo} not found`);

    // let position = null;

    // if (employee && positionParent) {
    //   position = new Position({ name, description, reportsTo, leaderId });
    //   return await this.entityManager.save(position);
    // } else
    //   throw new NotFoundException(`Employee with ID ${leaderId} not found`);
  }

  // READ
  async getRoots(): Promise<Position[]> {
    const roots = await this.positionRepository.find({
      where: { reportsTo: '', name: 'CEO' },
    });

    return roots;
  }

  // READ
  async getTrees(): Promise<any[]> {
    const positions = await this.positionRepository.find();
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    return this.buildTreeAbstract(positions, '', positionMap);
  }

  // READ
  async getTreeDetail(): Promise<any[]> {
    const positions = await this.positionRepository.find();
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    return this.buildTreeDetail(positions, '', positionMap);
  }

  // READ
  async findOne(id: string) {
    const position = await this.positionRepository.findOneByOrFail({ id });

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    let parentPositionName = null;
    if (position.reportsTo) {
      const parentPosition = await this.positionRepository.findOne({
        where: { id: position.reportsTo },
      });
      if (parentPosition) {
        parentPositionName = parentPosition.name;
      }
    }

    return {
      id: position.id,
      name: position.name,
      reportsTo: position.reportsTo,
      parent: parentPositionName,
    };
  }

  // READ
  async getEmployees(id: string) {
    return await this.employeeRepository.find({ where: { positionId: id } });
  }

  // READ
  async findAll() {
    const positions = await this.positionRepository.find({
      order: { name: 'ASC' },
    });

    // Create a map of position IDs to their names for easy lookup
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    return positions.map((position) => ({
      id: position.id,
      name: position.name,
      description: position.description,
      reportsTo: position.reportsTo ? positionMap[position.reportsTo] : null,
    }));
  }

  // READ
  async getAncestors(id: string) {
    const position = await this.findOne(id);
    const reportsTo = await this.positionRepository.findOneBy({
      id: position.reportsTo,
    });
  }

  // READ
  async getDescendants(id: string): Promise<Position[]> {
    const positions = await this.positionRepository.find();
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    const startPosition = positions.find((position) => position.id === id);
    if (!startPosition) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    return this.buildTree(positions, id, positionMap);
  }

  // READ STRING REPRESENTATION OF TREE
  async getTreeString(): Promise<string> {
    const positions = await this.positionRepository.find();
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    const tree = this.buildTreeForString(positions, '', positionMap);
    return this.buildTreeString(tree);
  }

  // READ STRING REPRESENTATION OF TREE FROM ANY POSITION
  async getTreeStringFromPosition(startPositionId: string): Promise<string> {
    const positions = await this.positionRepository.find();
    const positionMap = positions.reduce((map, position) => {
      map[position.id] = position.name;
      return map;
    }, {});

    const startPosition = positions.find(
      (position) => position.id === startPositionId,
    );
    if (!startPosition) {
      throw new NotFoundException(
        `Position with ID ${startPositionId} not found`,
      );
    }
    const tree = this.buildTree(positions, startPosition.id, positionMap);

    const treeWithRoot = [
      {
        name: startPosition.name,
        children: tree,
      },
    ];

    return this.buildTreeString(treeWithRoot);
  }

  // UPDATE
  async update(
    id: string,
    { name, description, reportsTo, leaderId }: UpdatePositionDto,
  ) {
    const position = await this.positionRepository.findOneByOrFail({ id });

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    name ? (position.name = name) : null;
    description ? (position.description = description) : null;
    reportsTo ? (position.reportsTo = reportsTo) : null;
    leaderId ? (position.leaderId = leaderId) : null;

    return await this.entityManager.save(position);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const position = await this.positionRepository.findOne({ where: { id } });

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    // Get all descendant positions
    const descendants = await this.getDescendantsForDelete(id);

    // Delete all descendants first
    await this.positionRepository.remove(descendants);

    // Delete the original position
    await this.positionRepository.remove(position);
  }

  private async getDescendantsForDelete(id: string): Promise<Position[]> {
    // Find direct children of the position
    const children = await this.positionRepository.find({
      where: { reportsTo: id },
    });

    // If there are no children, return an empty array
    if (children.length === 0) {
      return [];
    }

    // Recursively find descendants of each child
    const descendants = await Promise.all(
      children.map(async (child) => {
        const childDescendants = await this.getDescendants(child.id);
        return [child, ...childDescendants];
      }),
    );

    // Flatten the array and return
    return descendants.flat();
  }

  // HELPER METHOD TREE BUILDER
  private buildTreeDetail(
    positions: Position[],
    parentId: string | '' = '',
    positionMap: Record<string, string>,
  ): any[] {
    const tree: any[] = [];

    positions
      .filter((position) => position.reportsTo === parentId)
      .forEach((position) => {
        const node: any = {
          ...position,
          reportsTo: position.reportsTo
            ? positionMap[position.reportsTo]
            : null,
          children: this.buildTreeDetail(positions, position.id, positionMap), // Recursively build children
        };
        tree.push(node);
      });

    return tree;
  }

  // HELPER METHOD TO CREATE ABSTRACT TREE
  private buildTreeAbstract(
    positions: Position[],
    parentId: string | '' = '',
    positionMap: Record<string, string>,
  ): any[] {
    return positions
      .filter((position) => position.reportsTo === parentId)
      .map((position) => ({
        id: position.id,
        name: position.name,
        children: this.buildTreeAbstract(positions, position.id, positionMap),
      }));
  }

  // BUILD TREE METHOD
  private buildTree(
    positions: Position[],
    parentId: string | '' = '',
    positionMap: Record<string, string>,
  ): any[] {
    return positions
      .filter((position) => position.reportsTo === parentId)
      .map((position) => ({
        ...position,
        reportsTo: position.reportsTo ? positionMap[position.reportsTo] : null,
        children: this.buildTree(positions, position.id, positionMap),
      }));
  }
  // BUILD TREE STRING
  private buildTreeString(
    tree: any[],
    depth: number = 0,
    isLast: boolean[] = [],
  ): string {
    let treeString = '';

    tree.forEach((node, index) => {
      // Determine if the current node is the last child
      const currentIsLast = index === tree.length - 1;

      // Add proper indentation based on the depth of the node
      for (let i = 0; i < depth; i++) {
        if (isLast[i]) {
          treeString += '  ';
        } else {
          treeString += '  │  ';
        }
      }

      if (depth > 0) {
        treeString += currentIsLast ? '  └── ' : '  ├── ';
      }

      treeString += `${node.name}\n`;

      // Recursively add children if they exist
      if (node.children && node.children.length > 0) {
        treeString += this.buildTreeString(node.children, depth + 1, [
          ...isLast,
          currentIsLast,
        ]);
      }
    });

    return treeString;
  }

  private buildTreeForString(
    positions: Position[],
    parentId: string | '' = '',
    positionMap: Record<string, string>,
  ): any[] {
    return positions
      .filter((position) => position.reportsTo === parentId)
      .map((position) => ({
        name: position.name,
        children: this.buildTreeForString(positions, position.id, positionMap),
      }));
  }
}
