"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const accessToken = "443f16c7a154d84d0fd06a6e7a494ef7a74f4d13";
const url = "https://api.github.com/search/";
// function sortProjectsByStars(query) {}
function getPath(dir, q, page, token = accessToken) {
    return `${url}${dir}?q=${q}&page=${page}&access_token=${token}`;
}
exports.getPath = getPath;
async function getBody(dir, q, page = 1) {
    const query = getPath(dir, q, page);
    const response = await node_fetch_1.default(query);
    const body = await response.json();
    return body;
}
exports.getBody = getBody;
async function getSearchRate() {
    const response = await node_fetch_1.default("https://api.github.com/rate_limit?access_token=fe86467605bcdf4c5dc2b07e584cf91b05f5cc14");
    const body = await response.json();
    return body.resources.search;
}
exports.getSearchRate = getSearchRate;
var fetchTimeout = require('fetch-timeout');
fetchTimeout('https://api.github.com/', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}, 5000, 'My custom timeout error string')
    .then(function (res) {
    if (res.status !== 200) {
        throw new Error('Status code not OK', res.status);
    }
    else {
        return res.json();
    }
})
    .then(function (json) {
    console.log("json returned from response");
})
    .catch(function (err) {
    console.log("error", err);
});
