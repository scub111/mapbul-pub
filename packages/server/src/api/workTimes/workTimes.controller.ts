import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IWorkTimeDTO } from '@mapbul-pub/types';
import { WorkTimesService } from 'serverSrc/api/workTimes/workTimes.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/worktimes')
export class WorkTimesController implements IController<IWorkTimeDTO> {
  constructor(private readonly service: WorkTimesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IWorkTimeDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IWorkTimeDTO): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IWorkTimeDTO): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IWorkTimeDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IWorkTimeDTO): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}
}
