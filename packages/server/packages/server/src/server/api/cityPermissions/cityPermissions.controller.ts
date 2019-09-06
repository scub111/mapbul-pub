import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICityPermissionDTO } from './cityPermission.dto';
import { CityPermissionsService } from './cityPermissions.service';

@Controller('api/citypermissions')
export class CityPermissionsController implements IController<ICityPermissionDTO> {
  constructor(private readonly service: CityPermissionsService) {}

  @Get()
  async getAll(): Promise<ICityPermissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICityPermissionDTO): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICityPermissionDTO): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ICityPermissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICityPermissionDTO): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
