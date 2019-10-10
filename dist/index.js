"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
node_fetch_1.default("https://api.github.com/search/repositories?q=language:ts")
    .then(json => json.json())
    .then(res => console.log(res));
