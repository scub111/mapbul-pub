import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IUsertypeDTO } from 'server/usertypes/usertype.dto';
import { UsertypesService } from './usertypes.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('usertypes')
export class UsertypesController implements IController<IUsertypeDTO> {
  constructor(private readonly service: UsertypesService) {}

  @Get()
  async getAll(): Promise<IUsertypeDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IUsertypeDTO): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IUsertypeDTO): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IUsertypeDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IUsertypeDTO): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }
}
