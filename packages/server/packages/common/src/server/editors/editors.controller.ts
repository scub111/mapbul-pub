import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IEditorDTO } from 'server/editors/editor.dto';
import { EditorsService } from './editors.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('editors')
export class EditorsController implements IController<IEditorDTO> {
  constructor(private readonly service: EditorsService) {}

  @Get()
  async getAll(): Promise<IEditorDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IEditorDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IEditorDTO {
    throw new Error('Method not implemented.');
  }
}
