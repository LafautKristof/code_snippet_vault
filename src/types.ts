export type Message = {
    type: string;
    message: string;
};

export type SnippetType = {
    _id: string;
    title: string;
    description: string;
    language: string;
    tags: string[];
    code: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
};
