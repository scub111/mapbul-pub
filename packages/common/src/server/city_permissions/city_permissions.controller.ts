import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { ICity_permissionDTO } from 'server/city_permissions/city_permission.dto';
import { City_permissionsService } from './city_permissions.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('city_permissions')
export class City_permissionsController implements IController<ICity_permissionDTO> {
  constructor(private readonly service: City_permissionsService) {}

  @Get()
  async getAll(): Promise<ICity_permissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICity_permissionDTO): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICity_permissionDTO): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ICity_permissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICity_permissionDTO): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
