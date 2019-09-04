import { Module } from '@nestjs/common';
import { AppService } from 'server/app.service';
import { BooksService } from 'server/books/books.service';
import { ArticlesService } from 'server/articles/articles.service';
import { AppController } from 'server/app.controller';
import { BooksController } from 'server/books/books.controller';
import { ArticlesController } from 'server/articles/articles.controller';
import { Articles2Service } from 'server/articles2/articles2.service';
import { Articles2Controller } from 'server/articles2/articles2.controller';

@Module({
  imports: [],
  providers: [
    AppService,
    BooksService,
    {
      provide: 'IService',
      useClass: Articles2Service,
    },
  ],
  controllers: [AppController, BooksController, ArticlesController, Articles2Controller],
})
export class AppModule {}
