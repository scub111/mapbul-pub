import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IRegionPermissionDTO } from './regionPermission.dto';
import { RegionPermissionsService } from './regionPermissions.service';

@Controller('api/regionpermissions')
export class RegionPermissionsController implements IController<IRegionPermissionDTO> {
  constructor(private readonly service: RegionPermissionsService) {}

  @Get()
  async getAll(): Promise<IRegionPermissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IRegionPermissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
