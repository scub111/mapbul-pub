import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IEditorsDTO } from '@mapbul-pub/types';
import { EditorsService } from 'server/api/editors/editors.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/editors')
export class EditorsController implements IController<IEditorsDTO> {
  constructor(private readonly service: EditorsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(): Promise<IEditorsDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IEditorsDTO): IEditorsDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IEditorsDTO): IEditorsDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IEditorsDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IEditorsDTO): IEditorsDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IEditorsDTO {
    throw new Error('Method not implemented.');
  }
}
