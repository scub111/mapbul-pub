import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICountryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CountriesService } from 'serverSrc/api/countries/countries.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/countries')
export class CountriesController implements IController<ICountryDTO> {
  constructor(private readonly service: CountriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICountryDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ICountryDTO): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: ICountryDTO): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICountryDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: ICountryDTO): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
