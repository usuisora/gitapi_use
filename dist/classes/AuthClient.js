"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./Client"));
class AuthClient extends Client_1.default {
    constructor(access_token) {
        super();
        this.request = (url, delay = 5000) => {
            return super.request(url + "&access_token=" + this.access_token, delay);
        };
        this.access_token = access_token;
    }
}
exports.default = AuthClient;
