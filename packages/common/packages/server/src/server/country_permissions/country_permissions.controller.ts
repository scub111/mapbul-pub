import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { ICountry_permissionDTO } from 'server/country_permissions/country_permission.dto';
import { Country_permissionsService } from './country_permissions.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('country_permissions')
export class Country_permissionsController implements IController<ICountry_permissionDTO> {
  constructor(private readonly service: Country_permissionsService) {}

  @Get()
  async getAll(): Promise<ICountry_permissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICountry_permissionDTO): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICountry_permissionDTO): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ICountry_permissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICountry_permissionDTO): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
