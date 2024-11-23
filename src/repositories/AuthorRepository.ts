import { AppDataSource } from "../config/database";
import { Author } from "../entities/Author";

export class AuthorRepository {
    private repository = AppDataSource.getRepository(Author);

    async getAll(): Promise<Author[]> {
        return this.repository.find({ relations: ["books"] });
    }

    async create(name: string): Promise<Author> {
        const author = this.repository.create({ name });
        return this.repository.save(author);
    }
}
