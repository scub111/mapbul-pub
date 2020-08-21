import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AdminsService } from 'serverSrc/api/admins/admins.service';
import { AdminsController } from 'serverSrc/api/admins/admins.controller';
import { ArticlesService } from 'serverSrc/api/articles/articles.service';
import { ArticlesController } from 'serverSrc/api/articles/articles.controller';
import { ArticleSubcategoriesService } from 'serverSrc/api/articleSubcategories/articleSubcategories.service';
import { ArticleSubcategoriesController } from 'serverSrc/api/articleSubcategories/articleSubcategories.controller';
import { CategoriesService } from 'serverSrc/api/categories/categories.service';
import { CategoriesController } from 'serverSrc/api/categories/categories.controller';
import { CitiesService } from 'serverSrc/api/cities/cities.service';
import { CitiesController } from 'serverSrc/api/cities/cities.controller';
import { CountriesService } from 'serverSrc/api/countries/countries.service';
import { CountriesController } from 'serverSrc/api/countries/countries.controller';
import { CityPermissionsService } from 'serverSrc/api/cityPermissions/cityPermissions.service';
import { CityPermissionsController } from 'serverSrc/api/cityPermissions/cityPermissions.controller';
import { CountryPermissionsService } from 'serverSrc/api/countryPermissions/countryPermissions.service';
import { CountryPermissionsController } from 'serverSrc/api/countryPermissions/countryPermissions.controller';
import { DiscountsService } from 'serverSrc/api/discounts/discounts.service';
import { DiscountsController } from 'serverSrc/api/discounts/discounts.controller';
import { EditorsService } from 'serverSrc/api/editors/editors.service';
import { EditorsController } from 'serverSrc/api/editors/editors.controller';
import { FavoritesArticlesService } from 'serverSrc/api/favoritesArticles/favoritesArticles.service';
import { FavoritesArticlesController } from 'serverSrc/api/favoritesArticles/favoritesArticles.controller';
import { FavoritesMarkersService } from 'serverSrc/api/favoritesMarkers/favoritesMarkers.service';
import { FavoritesMarkersController } from 'serverSrc/api/favoritesMarkers/favoritesMarkers.controller';
import { GuidesService } from 'serverSrc/api/guides/guides.service';
import { GuidesController } from 'serverSrc/api/guides/guides.controller';
import { JournalistsService } from 'serverSrc/api/journalists/journalists.service';
import { JournalistsController } from 'serverSrc/api/journalists/journalists.controller';
import { MarkerPhotosService } from 'serverSrc/api/markerPhotos/markerPhotos.service';
import { MarkerPhotosController } from 'serverSrc/api/markerPhotos/markerPhotos.controller';
import { MarkerRequestSessionsService } from 'serverSrc/api/markerRequestSessions/markerRequestSessions.service';
import { MarkerRequestSessionsController } from 'serverSrc/api/markerRequestSessions/markerRequestSessions.controller';
import { MarkersService } from 'serverSrc/api/markers/markers.service';
import { MarkersController } from 'serverSrc/api/markers/markers.controller';
import { PhonesService } from 'serverSrc/api/phones/phones.service';
import { PhonesController } from 'serverSrc/api/phones/phones.controller';
import { RegionsService } from 'serverSrc/api/regions/regions.service';
import { RegionsController } from 'serverSrc/api/regions/regions.controller';
import { RegionPermissionsService } from 'serverSrc/api/regionPermissions/regionPermissions.service';
import { RegionPermissionsController } from 'serverSrc/api/regionPermissions/regionPermissions.controller';
import { StatusesService } from 'serverSrc/api/statuses/statuses.service';
import { StatusesController } from 'serverSrc/api/statuses/statuses.controller';
import { SubcategoriesService } from 'serverSrc/api/subcategories/subcategories.service';
import { SubcategoriesController } from 'serverSrc/api/subcategories/subcategories.controller';
import { TenantsService } from 'serverSrc/api/tenants/tenants.service';
import { TenantsController } from 'serverSrc/api/tenants/tenants.controller';
import { UsersService } from 'serverSrc/api/users/users.service';
import { UsersController } from 'serverSrc/api/users/users.controller';
import { UserTypesService } from 'serverSrc/api/userTypes/userTypes.service';
import { UserTypesController } from 'serverSrc/api/userTypes/userTypes.controller';
import { WeekDaysService } from 'serverSrc/api/weekDays/weekDays.service';
import { WeekDaysController } from 'serverSrc/api/weekDays/weekDays.controller';
import { WorkTimesService } from 'serverSrc/api/workTimes/workTimes.service';
import { WorkTimesController } from 'serverSrc/api/workTimes/workTimes.controller';
import { UploadController } from 'serverSrc/api/upload/upload.controller';

import { ApiController } from 'serverSrc/api.controller';
import { DbController } from 'serverSrc/api/db/db.controller';
import { UploadFileService } from 'serverSrc/api/upload/upload.fileService';
import { UploadFtpService } from 'serverSrc/api/upload/upload.ftpService';
import { AuthController } from 'serverSrc/api/auth/auth.controller';
import { AuthService } from 'serverSrc/api/auth/auth.service';
import { LocalStrategy } from 'serverSrc/api/auth/local.strategy';

@Module({
  imports: [PassportModule],
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
    UploadFileService,
    UploadFtpService,
    AuthService, 
    LocalStrategy
  ],
  controllers: [
    AppController,
    DbController,
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
    UploadController,
    ApiController,
    AuthController,
  ],
})
export class AppModule {}
