"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class URL {
    constructor(api, query, page = 1) {
        this.api = api;
        this.query = query;
        this.page = page;
    }
    toString() {
        return this.api + "?q=" + this.query + "&page=" + this.page;
    }
}
exports.default = URL;
