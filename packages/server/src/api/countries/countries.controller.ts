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
import { PageContent, ICountryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CountriesService } from './countries.service';
import { CountryDTO } from './countries.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/countries')
export class CountriesController implements IController<ICountryDTO> {
  constructor(private readonly service: CountriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICountryDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: CountryDTO): Promise<ICountryDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICountryDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: CountryDTO): Promise<ICountryDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<ICountryDTO> {
    return await this.service.deleteItem(id);
  }
}
