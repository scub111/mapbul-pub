import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IWorkTimeDTO } from './workTime.dto';
import { WorkTimesService } from './workTimes.service';

@Controller('api/worktimes')
export class WorkTimesController implements IController<IWorkTimeDTO> {
  constructor(private readonly service: WorkTimesService) {}

  @Get()
  async getAll(): Promise<IWorkTimeDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IWorkTimeDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
}
