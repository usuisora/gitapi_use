"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertor_1 = require("./convertor");
class QueryBuilder {
    constructor(name, baseUrl) {
        this.name = name;
        this.baseUrl = baseUrl;
    }
    getFullQuery(baseUrl, where, query) {
        if (typeof query == "object")
            query = convertor_1.objectToQuery(query);
        return `${baseUrl}/${where}?${query}`;
    }
}
