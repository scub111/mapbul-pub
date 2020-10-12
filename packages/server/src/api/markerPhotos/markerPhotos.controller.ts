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
import { PageContent, IMarkerPhotosDTO, IGetAllQuery } from '@mapbul-pub/types';
import { MarkerPhotosService } from './markerPhotos.service';
import { MarkerPhotosDTO } from './markerPhotos.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/markerphotos')
export class MarkerPhotosController implements IController<IMarkerPhotosDTO> {
  constructor(private readonly service: MarkerPhotosService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IMarkerPhotosDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: MarkerPhotosDTO): Promise<IMarkerPhotosDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerPhotosDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: MarkerPhotosDTO): Promise<IMarkerPhotosDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IMarkerPhotosDTO> {
    return await this.service.deleteItem(id);
  }
}
