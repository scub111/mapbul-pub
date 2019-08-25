import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';

@Module({
  imports: [],
  providers: [AppService, BooksService],
  controllers: [AppController, BooksController],
})
export class AppModule {}
