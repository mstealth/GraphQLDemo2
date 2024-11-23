import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";

export class BookRepository {
    private repository = AppDataSource.getRepository(Book);

    async getAll(): Promise<Book[]> {
        return this.repository.find({ relations: ["author"] });
    }

    async create(title: string, authorId: number): Promise<Book> {
        const authorRepository = AppDataSource.getRepository(Author);

        // Busca el autor por ID
        const author = await authorRepository.findOneBy({ id: authorId });
        if (!author) {
            throw new Error(`Author with ID ${authorId} not found.`);
        }

        // Crea el libro con el autor asociado
        const book = this.repository.create({ title, author });
        return this.repository.save(book);
    }
}
