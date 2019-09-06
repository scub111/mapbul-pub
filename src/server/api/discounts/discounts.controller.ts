import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IDiscountDTO } from './discount.dto';
import { DiscountsService } from './discounts.service';

@Controller('api/discounts')
export class DiscountsController implements IController<IDiscountDTO> {
  constructor(private readonly service: DiscountsService) {}

  @Get()
  async getAll(): Promise<IDiscountDTO[]> {
    return this.service.getAll();
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
