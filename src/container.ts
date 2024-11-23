import { AuthorRepository } from "./repositories/AuthorRepository";
import { BookRepository } from "./repositories/BookRepository";
import { AuthorService } from "./services/AuthorService";
import { BookService } from "./services/BookService";

const authorRepository = new AuthorRepository();
const bookRepository = new BookRepository();

export const container = {
    authorService: new AuthorService(authorRepository),
    bookService: new BookService(bookRepository),
};
