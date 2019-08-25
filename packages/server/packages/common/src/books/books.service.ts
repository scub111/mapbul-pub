import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
    books = BOOKS;

    getBooks(): Promise<any> {
       return new Promise(resolve => {
          resolve(this.books);
       });
    }

    getBook(bookId): Promise<any> {
       const id = Number(bookId);
       return new Promise(resolve => {
          const book = this.books.find(item => item.id === id);
          if (!book) {
             throw new HttpException('Book does not exist', 404);
          }
          resolve(book);
       });
    }

    addBooks(book): Promise<any> {
       return new Promise(resolve => {
          this.books.push(book);
          resolve(this.books);
       });
    }

    deleteBook(bookId): Promise<any> {
       const id = Number(bookId);
       return new Promise(resolve => {
          const index = this.books.findIndex(item => item.id === id);
          if (index === -1) {
             throw new HttpException('Books does not exist', 404);
          }
          this.books.slice(index, 1);
          resolve(this.books);
       });
    }
}
