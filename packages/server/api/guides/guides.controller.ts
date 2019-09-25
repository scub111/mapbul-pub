import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IGuideDTO } from './guide.dto';
import { GuidesService } from './guides.service';

@Controller('api/guides')
export class GuidesController implements IController<IGuideDTO> {
  constructor(private readonly service: GuidesService) {}

  @Get()
  async getAll(): Promise<IGuideDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IGuideDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IGuideDTO {
    throw new Error('Method not implemented.');
  }
}
