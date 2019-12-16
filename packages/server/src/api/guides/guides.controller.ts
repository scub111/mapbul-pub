import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IGuideDTO } from '@mapbul-pub/types';
import { GuidesService } from 'serverSrc/api/guides/guides.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/guides')
export class GuidesController implements IController<IGuideDTO> {
  constructor(private readonly service: GuidesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IGuideDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IGuideDTO): IGuideDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IGuideDTO): IGuideDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IGuideDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IGuideDTO): IGuideDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IGuideDTO {
  //  throw new Error('Method not implemented.');
  //}
}
