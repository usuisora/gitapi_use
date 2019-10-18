"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = (url, delay) => {
    const req = node_fetch_1.default(url);
    const timeout = new Promise((resolve, reject) => {
        return setTimeout(() => reject(new Error("request timeout")), delay);
    });
    return Promise.race([req, timeout]).then(response => response.json());
};
