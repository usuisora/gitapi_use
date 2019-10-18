"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class Client {
    async request(url) {
        let res = await node_fetch_1.default(url);
        return await res.json();
    }
    async getHeader(url, header) {
        const response = await node_fetch_1.default(url);
        const hds = await response.headers;
        return await hds.get(header);
    }
}
exports.default = Client;
