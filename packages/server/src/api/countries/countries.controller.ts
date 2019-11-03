import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICountryDTO } from './country.dto';
import { CountriesService } from './countries.service';

@Controller('api/countries')
export class CountriesController implements IController<ICountryDTO> {
  constructor(private readonly service: CountriesService) {}

  @Get()
  async getAll(): Promise<ICountryDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICountryDTO): ICountryDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICountryDTO): ICountryDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ICountryDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICountryDTO): ICountryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICountryDTO {
    throw new Error('Method not implemented.');
  }
}
