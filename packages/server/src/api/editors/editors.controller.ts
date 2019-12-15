import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { PageContent, IEditorDTO } from '@mapbul-pub/types';
import { EditorsService } from 'server/api/editors/editors.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/editors')
export class EditorsController implements IController<IEditorDTO> {
  constructor(private readonly service: EditorsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IEditorDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IEditorDTO): IEditorDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IEditorDTO): IEditorDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IEditorDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IEditorDTO): IEditorDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IEditorDTO {
  //  throw new Error('Method not implemented.');
  //}
}
