"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
class AuthClient extends Client_1.default {
    constructor(access_token) {
        super();
        this.request = (url) => {
            return super.request(url + this.access_token);
        };
        this.access_token = access_token;
    }
}
exports.default = AuthClient;
