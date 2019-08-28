import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Post()
  async addBook(@Body() bookDTO: BookDTO) {
    const book = await this.booksService.addBook(bookDTO);
    return book;
  }

  @Put()
  async putBooks(@Body() bookDTO: BookDTO) {
    await this.booksService.updateBooks(bookDTO);
  }

  @Delete()
  async deleteBooks() {
    await this.booksService.deleteBooks();
  }

  @Get(':bookId')
  async getBook(@Param('bookId') bookId) {
    const book = await this.booksService.getBook(bookId);
    return book;
  }

  @Put(':bookId')
  async putBook(@Param('bookId') bookId, @Body() bookDTO: BookDTO) {
    const book = await this.booksService.updateBook(bookId, bookDTO);
    return book;
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId) {
    const books = await this.booksService.deleteBook(bookId);
  }
}
