import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IRegion_permissionDTO } from 'server/region_permissions/region_permission.dto';
import { Region_permissionsService } from './region_permissions.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('region_permissions')
export class Region_permissionsController implements IController<IRegion_permissionDTO> {
  constructor(private readonly service: Region_permissionsService) {}

  @Get()
  async getAll(): Promise<IRegion_permissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IRegion_permissionDTO): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IRegion_permissionDTO): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IRegion_permissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IRegion_permissionDTO): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
