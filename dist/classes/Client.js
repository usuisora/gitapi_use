"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class Client {
    async request(url) {
        let response = await node_fetch_1.default(url);
        let body = await response.json();
        if (response.status == 401) {
            throw Error("BED TOKEN\n");
        }
        return body;
    }
    async getHeader(url, header) {
        const response = await node_fetch_1.default(url);
        const hds = await response.headers;
        return await hds.get(header);
    }
}
exports.default = Client;
