import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IDiscountDTO, IGetAllQuery } from '@mapbul-pub/types';
import { DiscountsService } from 'serverSrc/api/discounts/discounts.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/discounts')
export class DiscountsController implements IController<IDiscountDTO> {
  constructor(private readonly service: DiscountsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IDiscountDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IDiscountDTO): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IDiscountDTO): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IDiscountDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IDiscountDTO): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}
}
