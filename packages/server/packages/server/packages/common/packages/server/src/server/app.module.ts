import { Module } from '@nestjs/common';
import { AppService } from 'server/app.service';
import { BooksService } from 'server/books/books.service';
import { ArticlesService } from 'server/articles/articles.service';
import { AppController } from 'server/app.controller';
import { BooksController } from 'server/books/books.controller';
import { ArticlesController } from 'server/articles/articles.controller';

@Module({
  imports: [],
  providers: [
    AppService,
    BooksService,
    {
      provide: 'IService',
      useClass: ArticlesService,
    },
  ],
  controllers: [AppController, BooksController, ArticlesController],
})
export class AppModule {}
