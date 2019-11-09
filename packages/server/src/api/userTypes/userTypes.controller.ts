import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IUserTypeDTO } from 'server/api/usertypes/userType.dto';
import { UserTypesService } from 'server/api/usertypes/userTypes.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/usertypes')
export class UserTypesController implements IController<IUserTypeDTO> {
  constructor(private readonly service: UserTypesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(): Promise<IUserTypeDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IUserTypeDTO): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IUserTypeDTO): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IUserTypeDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IUserTypeDTO): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }
}
