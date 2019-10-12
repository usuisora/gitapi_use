"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const accessToken = "f8f4d45d996c1a8a77bacb02ce8b7b9626a9d19b";
const url = "https://api.github.com/search/";
// function sortProjectsByStars(query) {}
function getPath(dir, q, page, token = accessToken) {
    return `${url}${dir}?q=${q}&page=${page}&access_token=${token}`;
}
async function getBody(dir, q, page) {
    const query = getPath(dir, q, page);
    const response = await node_fetch_1.default(query);
    const body = await response.json();
    return body;
}
exports.getBody = getBody;
