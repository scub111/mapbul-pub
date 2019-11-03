import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IUserTypeDTO } from './userType.dto';
import { UserTypesService } from './userTypes.service';

@Controller('api/usertypes')
export class UserTypesController implements IController<IUserTypeDTO> {
  constructor(private readonly service: UserTypesService) {}

  @Get()
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
