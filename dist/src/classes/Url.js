"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class URL {
    constructor(api, query, access_token, page = 1) {
        this.api = api;
        this.query = query;
        this.access_token = access_token;
        this.page = page;
    }
    toString() {
        return (this.api +
            "?q=" +
            this.query +
            "&page=" +
            this.page +
            "&access_token" +
            this.access_token);
    }
}
exports.default = URL;
