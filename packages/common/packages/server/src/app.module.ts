import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';

@Module({
  imports: [],
  providers: [
    AppService,
    BooksService,
    {
      provide: 'IService',
      useClass: ArticlesService
    }
  ],
  controllers: [AppController, BooksController, ArticlesController]
})
export class AppModule {}
