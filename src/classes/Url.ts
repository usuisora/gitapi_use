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
  constructor(
    api: string,
    query: string,
    access_token: string,
    page: number = 1
  ) {
    this.api = api;
    this.query = query;
    this.access_token = access_token;
    this.page = page;
  }
  toString(): string {
    return (
      this.api +
      "?q=" +
      this.query +
      "&page=" +
      this.page +
      "&access_token" +
      this.access_token
    );
  }
}
