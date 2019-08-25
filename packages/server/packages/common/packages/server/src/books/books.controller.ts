import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    const newBook = { ...createBookDTO, ...{ author: 'test 123+++' } };
    const book = await this.booksService.addBooks(newBook);

    return book;
  }

  @Delete()
  async deleteBooks() {
    const books = await this.booksService.deleteBooks();
  }

  @Get(':bookId')
  async getBook(@Param('bookId') bookId) {
    const book = await this.booksService.getBook(bookId);
    return book;
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId) {
    const books = await this.booksService.deleteBook(bookId);
  }
}