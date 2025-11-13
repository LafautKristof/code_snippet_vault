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
    user: User;
    isPublic: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
};

export type User = {
    _id: string;
    username: string;
    email: string;
    snippetCount: number;
};
