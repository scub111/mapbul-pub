import { Module } from '@nestjs/common';
import { AppService } from 'server/app.service';
import { AppController } from 'server/app.controller';
import { AdminsService } from 'server/admins/admins.service';
import { AdminsController } from 'server/admins/admins.controller';
// import { ArticlesService } from 'server/articles/articles.service';
// import { ArticlesController } from 'server/articles/articles.controller';
// import { ArticlesubcategoriesService } from 'server/articlesubcategories/articlesubcategories.service';
// import { ArticlesubcategoriesController } from 'server/articlesubcategories/articlesubcategories.controller';
// import { CategoriesService } from 'server/categories/categories.service';
// import { CategoriesController } from 'server/categories/categories.controller';

@Module({
  imports: [],
  providers: [
    AppService,
    AdminsService,
    // ArticlesService,
    // ArticlesubcategoriesService,
    // CategoriesService,
  ],
  controllers: [
    AppController,
    AdminsController,
    // ArticlesController,
    // ArticlesubcategoriesController,
    // CategoriesController,
  ]
})
export class AppModule {}
