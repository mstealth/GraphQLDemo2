import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorService {
    constructor(private authorRepository: AuthorRepository) { }

    async getAllAuthors() {
        return this.authorRepository.getAll();
    }

    async addAuthor(name: string) {
        return this.authorRepository.create(name);
    }
}
