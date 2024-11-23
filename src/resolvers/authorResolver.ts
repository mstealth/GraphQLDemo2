import { container } from "../container";

export const authorResolver = {
    Query: {
        authors: async () => {
            return container.authorService.getAllAuthors();
        },
    },
    Mutation: {
        addAuthor: async (_: any, { name }: { name: string }) => {
            return container.authorService.addAuthor(name);
        },
    },
};
