"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fetch = require("fetch-retry");
function fetching(v) {
    let url = "https://api.github.com/search/repositories?q=version" + v;
    fetch(url, {
        retryOn: [403],
        retries: 3,
        retryDelay: 1000
    })
        .then(function (response) {
        return response.json();
    })
        .then(function (json) {
        // do something with the result
        console.log(json.total_count);
    });
}
function default_1() {
    for (let i = 0; i < 1; i++) {
        fetching(i);
        console.log(i);
    }
}
exports.default = default_1;
