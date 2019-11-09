import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IJournalistDTO } from 'server/api/journalists/journalist.dto';
import { JournalistsService } from 'server/api/journalists/journalists.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

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
  @UseInterceptors(NotFoundInterceptor)
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
