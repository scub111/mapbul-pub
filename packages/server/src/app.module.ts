import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AdminsService } from 'src/api/admins/admins.service';
import { AdminsController } from 'src/api/admins/admins.controller';
import { ArticlesService } from 'src/api/articles/articles.service';
import { ArticlesController } from 'src/api/articles/articles.controller';
import { ArticleSubcategoriesService } from 'src/api/articleSubcategories/articleSubcategories.service';
import { ArticleSubcategoriesController } from 'src/api/articleSubcategories/articleSubcategories.controller';
import { CategoriesService } from 'src/api/categories/categories.service';
import { CategoriesController } from 'src/api/categories/categories.controller';
import { CitiesService } from 'src/api/cities/cities.service';
import { CitiesController } from 'src/api/cities/cities.controller';
import { CountriesService } from 'src/api/countries/countries.service';
import { CountriesController } from 'src/api/countries/countries.controller';
import { CityPermissionsService } from 'src/api/cityPermissions/cityPermissions.service';
import { CityPermissionsController } from 'src/api/cityPermissions/cityPermissions.controller';
import { CountryPermissionsService } from 'src/api/countryPermissions/countryPermissions.service';
import { CountryPermissionsController } from 'src/api/countryPermissions/countryPermissions.controller';
import { DiscountsService } from 'src/api/discounts/discounts.service';
import { DiscountsController } from 'src/api/discounts/discounts.controller';
import { EditorsService } from 'src/api/editors/editors.service';
import { EditorsController } from 'src/api/editors/editors.controller';
import { FavoritesArticlesService } from 'src/api/favoritesArticles/favoritesArticles.service';
import { FavoritesArticlesController } from 'src/api/favoritesArticles/favoritesArticles.controller';
import { FavoritesMarkersService } from 'src/api/favoritesMarkers/favoritesMarkers.service';
import { FavoritesMarkersController } from 'src/api/favoritesMarkers/favoritesMarkers.controller';
import { GuidesService } from 'src/api/guides/guides.service';
import { GuidesController } from 'src/api/guides/guides.controller';
import { JournalistsService } from 'src/api/journalists/journalists.service';
import { JournalistsController } from 'src/api/journalists/journalists.controller';
import { MarkerPhotosService } from 'src/api/markerPhotos/markerPhotos.service';
import { MarkerPhotosController } from 'src/api/markerPhotos/markerPhotos.controller';
import { MarkerRequestSessionsService } from 'src/api/markerRequestSessions/markerRequestSessions.service';
import { MarkerRequestSessionsController } from 'src/api/markerRequestSessions/markerRequestSessions.controller';
import { MarkersService } from 'src/api/markers/markers.service';
import { MarkersController } from 'src/api/markers/markers.controller';
import { PhonesService } from 'src/api/phones/phones.service';
import { PhonesController } from 'src/api/phones/phones.controller';
import { RegionsService } from 'src/api/regions/regions.service';
import { RegionsController } from 'src/api/regions/regions.controller';
import { RegionPermissionsService } from 'src/api/regionPermissions/regionPermissions.service';
import { RegionPermissionsController } from 'src/api/regionPermissions/regionPermissions.controller';
import { StatusesService } from 'src/api/statuses/statuses.service';
import { StatusesController } from 'src/api/statuses/statuses.controller';
import { SubcategoriesService } from 'src/api/subcategories/subcategories.service';
import { SubcategoriesController } from 'src/api/subcategories/subcategories.controller';
import { TenantsService } from 'src/api/tenants/tenants.service';
import { TenantsController } from 'src/api/tenants/tenants.controller';
import { UsersService } from 'src/api/users/users.service';
import { UsersController } from 'src/api/users/users.controller';
import { UserTypesService } from 'src/api/userTypes/userTypes.service';
import { UserTypesController } from 'src/api/userTypes/userTypes.controller';
import { WeekDaysService } from 'src/api/weekDays/weekDays.service';
import { WeekDaysController } from 'src/api/weekDays/weekDays.controller';
import { WorkTimesService } from 'src/api/workTimes/workTimes.service';
import { WorkTimesController } from 'src/api/workTimes/workTimes.controller';

import { ApiController } from 'server/api.controller';

@Module({
  imports: [],
  providers: [
    AppService,
    AdminsService,
    ArticlesService,
    ArticleSubcategoriesService,
    CategoriesService,
    CitiesService,
    CountriesService,
    CountryPermissionsService,
    CityPermissionsService,
    DiscountsService,
    EditorsService,
    FavoritesArticlesService,
    FavoritesMarkersService,
    GuidesService,
    JournalistsService,
    MarkerPhotosService,
    MarkerRequestSessionsService,
    MarkersService,
    PhonesService,
    RegionsService,
    RegionPermissionsService,
    StatusesService,
    SubcategoriesService,
    TenantsService,
    UsersService,
    UserTypesService,
    WeekDaysService,
    WorkTimesService,
  ],
  controllers: [
    AppController,
    AdminsController,
    ArticlesController,
    ArticleSubcategoriesController,
    CategoriesController,
    CitiesController,
    CountriesController,
    CountryPermissionsController,
    CityPermissionsController,
    DiscountsController,
    EditorsController,
    FavoritesArticlesController,
    FavoritesMarkersController,
    GuidesController,
    JournalistsController,
    MarkerPhotosController,
    MarkerRequestSessionsController,
    MarkersController,
    PhonesController,
    RegionsController,
    RegionPermissionsController,
    StatusesController,
    SubcategoriesController,
    TenantsController,
    UsersController,
    UserTypesController,
    WeekDaysController,
    WorkTimesController,

    ApiController,
  ],
})
export class AppModule {}
