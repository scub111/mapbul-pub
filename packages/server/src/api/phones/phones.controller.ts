import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IPhoneDTO } from 'server/api/phones/phone.dto';
import { PhonesService } from 'server/api/phones/phones.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/phones')
export class PhonesController implements IController<IPhoneDTO> {
  constructor(private readonly service: PhonesService) {}

  @Get()
  async getAll(): Promise<IPhoneDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IPhoneDTO): IPhoneDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IPhoneDTO): IPhoneDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IPhoneDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IPhoneDTO): IPhoneDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IPhoneDTO {
    throw new Error('Method not implemented.');
  }
}
