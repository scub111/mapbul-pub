import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IPhoneDTO } from '@mapbul-pub/types';
import { PhonesService } from 'serverSrc/api/phones/phones.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/phones')
export class PhonesController implements IController<IPhoneDTO> {
  constructor(private readonly service: PhonesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IPhoneDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IPhoneDTO): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IPhoneDTO): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IPhoneDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IPhoneDTO): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}
}
