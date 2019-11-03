import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AdminsService } from 'server/api/admins/admins.service';
import { AdminsController } from 'server/api/admins/admins.controller';
import { ArticlesService } from 'server/api/articles/articles.service';
import { ArticlesController } from 'server/api/articles/articles.controller';
import { ArticleSubcategoriesService } from 'server/api/articleSubcategories/articleSubcategories.service';
import { ArticleSubcategoriesController } from 'server/api/articleSubcategories/articleSubcategories.controller';
import { CategoriesService } from 'server/api/categories/categories.service';
import { CategoriesController } from 'server/api/categories/categories.controller';
import { CitiesService } from 'server/api/cities/cities.service';
import { CitiesController } from 'server/api/cities/cities.controller';
import { CountriesService } from 'server/api/countries/countries.service';
import { CountriesController } from 'server/api/countries/countries.controller';
import { CityPermissionsService } from 'server/api/cityPermissions/cityPermissions.service';
import { CityPermissionsController } from 'server/api/cityPermissions/cityPermissions.controller';
import { CountryPermissionsService } from 'server/api/countryPermissions/countryPermissions.service';
import { CountryPermissionsController } from 'server/api/countryPermissions/CountryPermissions.controller';
import { DiscountsService } from 'server/api/discounts/discounts.service';
import { DiscountsController } from 'server/api/discounts/discounts.controller';
import { EditorsService } from 'server/api/editors/editors.service';
import { EditorsController } from 'server/api/editors/editors.controller';
import { FavoritesArticlesService } from 'server/api/favoritesArticles/favoritesArticles.service';
import { FavoritesArticlesController } from 'server/api/favoritesArticles/favoritesArticles.controller';
import { FavoritesMarkersService } from 'server/api/favoritesMarkers/favoritesMarkers.service';
import { FavoritesMarkersController } from 'server/api/favoritesMarkers/favoritesMarkers.controller';
import { GuidesService } from 'server/api/guides/guides.service';
import { GuidesController } from 'server/api/guides/guides.controller';
import { JournalistsService } from 'server/api/journalists/journalists.service';
import { JournalistsController } from 'server/api/journalists/journalists.controller';
import { MarkerPhotosService } from 'server/api/markerPhotos/markerPhotos.service';
import { MarkerPhotosController } from 'server/api/markerPhotos/markerPhotos.controller';
import { MarkerRequestSessionsService } from 'server/api/markerRequestSessions/markerRequestSessions.service';
import { MarkerRequestSessionsController } from 'server/api/markerRequestSessions/markerRequestSessions.controller';
import { MarkersService } from 'server/api/markers/markers.service';
import { MarkersController } from 'server/api/markers/markers.controller';
import { PhonesService } from 'server/api/phones/phones.service';
import { PhonesController } from 'server/api/phones/phones.controller';
import { RegionsService } from 'server/api/regions/regions.service';
import { RegionsController } from 'server/api/regions/regions.controller';
import { RegionPermissionsService } from 'server/api/regionPermissions/regionPermissions.service';
import { RegionPermissionsController } from 'server/api/regionPermissions/regionPermissions.controller';
import { StatusesService } from 'server/api/statuses/statuses.service';
import { StatusesController } from 'server/api/statuses/statuses.controller';
import { SubcategoriesService } from 'server/api/subcategories/subcategories.service';
import { SubcategoriesController } from 'server/api/subcategories/subcategories.controller';
import { TenantsService } from 'server/api/tenants/tenants.service';
import { TenantsController } from 'server/api/tenants/tenants.controller';
import { UsersService } from 'server/api/users/users.service';
import { UsersController } from 'server/api/users/users.controller';
import { UserTypesService } from 'server/api/usertypes/userTypes.service';
import { UserTypesController } from 'server/api/usertypes/userTypes.controller';
import { WeekDaysService } from 'server/api/weekdays/weekDays.service';
import { WeekDaysController } from 'server/api/weekdays/weekDays.controller';
import { WorkTimesService } from 'server/api/worktimes/workTimes.service';
import { WorkTimesController } from 'server/api/worktimes/workTimes.controller';
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
    ApiController,
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
  ],
})
export class AppModule {}
