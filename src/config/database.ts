import { DataSource } from "typeorm";
import { Author } from "../entities/Author";
import { Book } from "../entities/Book";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "example.db",
    synchronize: true,
    logging: true,
    entities: [Author, Book],
});
