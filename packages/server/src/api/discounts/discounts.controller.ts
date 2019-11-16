import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { Pagination, IDiscountDTO } from '@mapbul-pub/types';
import { DiscountsService } from 'server/api/discounts/discounts.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/discounts')
export class DiscountsController implements IController<IDiscountDTO> {
  constructor(private readonly service: DiscountsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<Pagination<IDiscountDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  postItem(item: IDiscountDTO): IDiscountDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IDiscountDTO): IDiscountDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IDiscountDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IDiscountDTO): IDiscountDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IDiscountDTO {
    throw new Error('Method not implemented.');
  }
}
