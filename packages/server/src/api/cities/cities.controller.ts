import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICityDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CitiesService } from 'serverSrc/api/cities/cities.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/cities')
export class CitiesController implements IController<ICityDTO> {
  constructor(private readonly service: CitiesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICityDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ICityDTO): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: ICityDTO): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICityDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: ICityDTO): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}
}
