import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IAdminDTO } from './admin.dto';
import { AdminsService } from './admins.service';

@Controller('api/admins')
export class AdminsController implements IController<IAdminDTO> {
  constructor(private readonly service: AdminsService) {}

  @Get()
  async getAll(): Promise<IAdminDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IAdminDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }
}
