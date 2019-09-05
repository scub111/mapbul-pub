import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IWorktimeDTO } from 'server/worktimes/worktime.dto';
import { WorktimesService } from './worktimes.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('worktimes')
export class WorktimesController implements IController<IWorktimeDTO> {
  constructor(private readonly service: WorktimesService) {}

  @Get()
  async getAll(): Promise<IWorktimeDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IWorktimeDTO): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IWorktimeDTO): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IWorktimeDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IWorktimeDTO): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }
}
