import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICountryPermissionDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CountryPermissionsService } from 'serverSrc/api/countryPermissions/countryPermissions.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/countrypermissions')
export class CountryPermissionsController implements IController<ICountryPermissionDTO> {
  constructor(private readonly service: CountryPermissionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICountryPermissionDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ICountryPermissionDTO): ICountryPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: ICountryPermissionDTO): ICountryPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICountryPermissionDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: ICountryPermissionDTO): ICountryPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICountryPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
