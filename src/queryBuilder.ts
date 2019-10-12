import { objectToQuery } from "./convertor";
import { dirs } from "./types";

class QueryBuilder {
  name: string;
  baseUrl: string;
  constructor(name, baseUrl) {
    this.name = name;
    this.baseUrl = baseUrl;
  }
  getFullQuery(baseUrl, where: dirs, query: string | object) {
    if (typeof query == "object") query = objectToQuery(query);
    return `${baseUrl}/${where}?${query}`;
  }
}
