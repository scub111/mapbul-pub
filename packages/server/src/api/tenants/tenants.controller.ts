import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Put,
  Body,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IController, IGetParams } from 'interfaces';
import { PageContent, ITenantDTO, IGetAllQuery } from '@mapbul-pub/types';
import { TenantsService } from './tenants.service';
import { TenantDTO } from './tenants.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/tenants')
export class TenantsController implements IController<ITenantDTO> {
  constructor(private readonly service: TenantsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ITenantDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: TenantDTO): Promise<ITenantDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ITenantDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: TenantDTO): Promise<ITenantDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<ITenantDTO> {
    return await this.service.deleteItem(id);
  }
}
