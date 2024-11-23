import { container } from "../container";

export const bookResolver = {
    Query: {
        books: async () => {
            return container.bookService.getAllBooks();
        },
    },
    Mutation: {
        addBook: async (_: any, { title, authorId }: { title: string; authorId: number }) => {
            return container.bookService.addBook(title, authorId);
        },
    },
};
