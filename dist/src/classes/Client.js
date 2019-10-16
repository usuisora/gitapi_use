"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_timeout_1 = require("fetch-timeout");
class Client {
    constructor() {
        this.request = (url) => {
            return fetch_timeout_1.default(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }, 5000, "My custom timeout error string")
                .then(res => {
                if (res.status !== 200) {
                    throw new Error("Status code not OK :" + res.status);
                }
                else {
                    return res.json();
                }
            })
                .then(json => {
                console.log("json returned from response");
            })
                .catch(err => {
                console.log("error", err);
            });
        };
    }
}
exports.default = Client;
