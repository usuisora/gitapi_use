interface iURL {
    api: string;
    query: string;
    page: number;
    access_token: string;
    toString(): string;
}
export default class URL implements iURL {
    api: string;
    query: string;
    page: number;
    access_token: string;
    constructor(api: string, query: string, access_token: string, page?: number);
    toString(): string;
}
export {};
