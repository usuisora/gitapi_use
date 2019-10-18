"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = __importDefault(require("fetch"));
class Client {
    async request(url) {
        let res = await fetch_1.default(url);
        return await res.json();
    }
}
exports.default = Client;
