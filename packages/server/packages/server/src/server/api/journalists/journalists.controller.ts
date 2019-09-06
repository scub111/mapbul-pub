import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IJournalistDTO } from './journalist.dto';
import { JournalistsService } from './journalists.service';

@Controller('api/journalists')
export class JournalistsController implements IController<IJournalistDTO> {
  constructor(private readonly service: JournalistsService) {}

  @Get()
  async getAll(): Promise<IJournalistDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IJournalistDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
}
