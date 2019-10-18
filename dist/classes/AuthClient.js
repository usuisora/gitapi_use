"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./Client"));
class AuthClient extends Client_1.default {
    constructor(access_token) {
        super();
        this.request = (url) => {
            return super.request(url + "&access_token=" + this.access_token);
        };
        this.getHeader = (url, header) => {
            return super.getHeader(url + "&access_token=" + this.access_token, header);
        };
        this.access_token = access_token;
    }
}
exports.default = AuthClient;
