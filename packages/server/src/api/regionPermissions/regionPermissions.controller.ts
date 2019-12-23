import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IRegionPermissionDTO, IGetAllQuery } from '@mapbul-pub/types';
import { RegionPermissionsService } from 'serverSrc/api/regionPermissions/regionPermissions.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/regionpermissions')
export class RegionPermissionsController implements IController<IRegionPermissionDTO> {
  constructor(private readonly service: RegionPermissionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IRegionPermissionDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IRegionPermissionDTO): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IRegionPermissionDTO): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IRegionPermissionDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IRegionPermissionDTO): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
