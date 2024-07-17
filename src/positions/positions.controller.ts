import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// @UseGuards(JwtAuthGuard)
@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @ApiOkResponse({ description: 'tree view in JSON' })
  @Get('/tree')
  async getTrees() {
    return this.positionsService.getTrees();
  }

  @ApiOkResponse({ description: 'tree detailed view in JSON' })
  @Get('/tree/detail')
  async getTreesDetail() {
    return this.positionsService.getTreeDetail();
  }

  @ApiOkResponse({ description: 'tree view in hierarchy view ' })
  @Get('tree/string')
  async getTree(): Promise<string> {
    return await this.positionsService.getTreeString();
  }

  @ApiOkResponse({
    description: 'tree view from specific position hierarchy view',
  })
  @Get('tree/:id/string')
  async getTreeFromPosition(@Param('id') id: string): Promise<string> {
    return await this.positionsService.getTreeStringFromPosition(id);
  }

  @ApiOkResponse({ description: 'The root of all position' })
  @Get('/root')
  async getRoots() {
    return this.positionsService.getRoots();
  }

  @ApiOkResponse({ description: 'create new position' })
  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @ApiOkResponse({ description: 'get all positions available' })
  @Get()
  async findAll() {
    return this.positionsService.findAll();
  }

  @ApiOkResponse({ description: 'The all employee of specific position' })
  @Get('/:id/employee')
  async getEmployees(@Param('id') id: string) {
    return this.positionsService.getEmployees(id);
  }

  @ApiOkResponse({ description: 'get single position' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @ApiOkResponse({ description: 'update position info' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @ApiOkResponse({ description: 'remove position from tree' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }

  @ApiOkResponse({ description: 'get descendant tree of specific position' })
  @Get(':id/tree')
  async getDescendants(@Param('id') id: string) {
    return this.positionsService.getDescendants(id);
  }
}
