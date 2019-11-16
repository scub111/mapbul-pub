import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { Pagination, ICountryDTO } from '@mapbul-pub/types';
import { CountriesService } from 'server/api/countries/countries.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/countries')
export class CountriesController implements IController<ICountryDTO> {
  constructor(private readonly service: CountriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<Pagination<ICountryDTO>> {
    return this.service.getAll(query);
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
  @UseInterceptors(NotFoundInterceptor)
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
