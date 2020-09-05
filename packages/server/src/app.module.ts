import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AdminsService } from 'api/admins/admins.service';
import { AdminsController } from 'api/admins/admins.controller';
import { ArticlesService } from 'api/articles/articles.service';
import { ArticlesController } from 'api/articles/articles.controller';
import { ArticleSubcategoriesService } from 'api/articleSubcategories/articleSubcategories.service';
import { ArticleSubcategoriesController } from 'api/articleSubcategories/articleSubcategories.controller';
import { CategoriesService } from 'api/categories/categories.service';
import { CategoriesController } from 'api/categories/categories.controller';
import { CitiesService } from 'api/cities/cities.service';
import { CitiesController } from 'api/cities/cities.controller';
import { CountriesService } from 'api/countries/countries.service';
import { CountriesController } from 'api/countries/countries.controller';
import { CityPermissionsService } from 'api/cityPermissions/cityPermissions.service';
import { CityPermissionsController } from 'api/cityPermissions/cityPermissions.controller';
import { CountryPermissionsService } from 'api/countryPermissions/countryPermissions.service';
import { CountryPermissionsController } from 'api/countryPermissions/countryPermissions.controller';
import { DiscountsService } from 'api/discounts/discounts.service';
import { DiscountsController } from 'api/discounts/discounts.controller';
import { EditorsService } from 'api/editors/editors.service';
import { EditorsController } from 'api/editors/editors.controller';
import { FavoritesArticlesService } from 'api/favoritesArticles/favoritesArticles.service';
import { FavoritesArticlesController } from 'api/favoritesArticles/favoritesArticles.controller';
import { FavoritesMarkersService } from 'api/favoritesMarkers/favoritesMarkers.service';
import { FavoritesMarkersController } from 'api/favoritesMarkers/favoritesMarkers.controller';
import { GuidesService } from 'api/guides/guides.service';
import { GuidesController } from 'api/guides/guides.controller';
import { JournalistsService } from 'api/journalists/journalists.service';
import { JournalistsController } from 'api/journalists/journalists.controller';
import { MarkerPhotosService } from 'api/markerPhotos/markerPhotos.service';
import { MarkerPhotosController } from 'api/markerPhotos/markerPhotos.controller';
import { MarkerRequestSessionsService } from 'api/markerRequestSessions/markerRequestSessions.service';
import { MarkerRequestSessionsController } from 'api/markerRequestSessions/markerRequestSessions.controller';
import { MarkersService } from 'api/markers/markers.service';
import { MarkersController } from 'api/markers/markers.controller';
import { PhonesService } from 'api/phones/phones.service';
import { PhonesController } from 'api/phones/phones.controller';
import { RegionsService } from 'api/regions/regions.service';
import { RegionsController } from 'api/regions/regions.controller';
import { RegionPermissionsService } from 'api/regionPermissions/regionPermissions.service';
import { RegionPermissionsController } from 'api/regionPermissions/regionPermissions.controller';
import { StatusesService } from 'api/statuses/statuses.service';
import { StatusesController } from 'api/statuses/statuses.controller';
import { SubcategoriesService } from 'api/subcategories/subcategories.service';
import { SubcategoriesController } from 'api/subcategories/subcategories.controller';
import { TenantsService } from 'api/tenants/tenants.service';
import { TenantsController } from 'api/tenants/tenants.controller';
import { UsersService } from 'api/users/users.service';
import { UsersController } from 'api/users/users.controller';
import { UserTypesService } from 'api/userTypes/userTypes.service';
import { UserTypesController } from 'api/userTypes/userTypes.controller';
import { WeekDaysService } from 'api/weekDays/weekDays.service';
import { WeekDaysController } from 'api/weekDays/weekDays.controller';
import { WorkTimesService } from 'api/workTimes/workTimes.service';
import { WorkTimesController } from 'api/workTimes/workTimes.controller';
import { UploadController } from 'api/upload/upload.controller';

import { ApiController } from './api.controller';
import { DbController } from 'api/db/db.controller';
import { UploadFileService } from 'api/upload/upload.fileService';
import { UploadFtpService } from 'api/upload/upload.ftpService';
import { AuthController } from 'api/auth/auth.controller';
import { AuthService } from 'api/auth/auth.service';
import { LocalStrategy } from 'api/auth/local.strategy';
import { JwtStrategy } from 'api/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
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
    LocalStrategy,
    JwtStrategy,
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
