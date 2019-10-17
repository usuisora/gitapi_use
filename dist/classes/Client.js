"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_timeout_1 = __importDefault(require("fetch-timeout"));
class Client {
    request(url, delay = 5000) {
        return fetch_timeout_1.default(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": "request"
            }
        }, delay, "My custom timeout error string")
            .then(res => {
            if (res.status !== 200) {
                throw new Error("Status code not OK :" + res.status);
            }
            else {
                return res.json();
            }
        })
            .then(json => {
            console.log("request every " + delay * 0.001 + " seconds");
            return json;
        })
            .catch(err => {
            return this.request(url, delay * 10);
        });
    }
}
exports.default = Client;
