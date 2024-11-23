import { BookRepository } from "../repositories/BookRepository";

export class BookService {
    constructor(private bookRepository: BookRepository) { }

    async getAllBooks() {
        return this.bookRepository.getAll();
    }

    async addBook(title: string, authorId: number) {
        return this.bookRepository.create(title, authorId);
    }
}
