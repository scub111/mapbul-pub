import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IWeekdayDTO } from 'server/weekdays/weekday.dto';
import { WeekdaysService } from './weekdays.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('weekdays')
export class WeekdaysController implements IController<IWeekdayDTO> {
  constructor(private readonly service: WeekdaysService) {}

  @Get()
  async getAll(): Promise<IWeekdayDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IWeekdayDTO): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IWeekdayDTO): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IWeekdayDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IWeekdayDTO): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }
}
