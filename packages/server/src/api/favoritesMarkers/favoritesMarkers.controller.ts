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
import { PageContent, IFavoritesMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';
import { FavoritesMarkersService } from './favoritesMarkers.service';
import { FavoritesMarkerDTO } from './favoritesMarkers.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/favoritesmarkers')
export class FavoritesMarkersController implements IController<IFavoritesMarkerDTO> {
  constructor(private readonly service: FavoritesMarkersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IFavoritesMarkerDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: FavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IFavoritesMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: FavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IFavoritesMarkerDTO> {
    return await this.service.deleteItem(id);
  }
}
