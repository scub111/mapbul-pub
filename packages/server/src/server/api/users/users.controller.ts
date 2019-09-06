import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IUserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController implements IController<IUserDTO> {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll(): Promise<IUserDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IUserDTO): IUserDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IUserDTO): IUserDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IUserDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IUserDTO): IUserDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IUserDTO {
    throw new Error('Method not implemented.');
  }
}
