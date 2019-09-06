import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IWeekDayDTO } from './weekDay.dto';
import { WeekDaysService } from './weekDays.service';

@Controller('api/weekdays')
export class WeekDaysController implements IController<IWeekDayDTO> {
  constructor(private readonly service: WeekDaysService) {}

  @Get()
  async getAll(): Promise<IWeekDayDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IWeekDayDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
}
