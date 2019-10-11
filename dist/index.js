"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
let gitApi = "https://api.github.com/search/";
let token = "daf6ad231ba6903840667d355eebca078554ff89";
let headers = {
    Authorization: token
};
async function queryApiByDir(where, query, filter) {
    let url = `${gitApi}${where}?${query}`;
    let fetchData = await node_fetch_1.default(url, {
        method: "GET",
        headers
    });
    let jsonData = await fetchData.json();
    let filteredData = [];
    if (jsonData.items.length)
        jsonData.items.map(async (p) => await filteredData.push(p[filter]));
    return {
        filteredData,
        total_count: jsonData.total_count
    };
}
function queryRepos(query, filter = "full_name") {
    return queryApiByDir("repositories", query, filter);
}
async function queryCodeInRepo(query, repo, filter = "html_url") {
    return queryApiByDir("code", `${query}+repo:${repo}`, filter);
}
// queryRepos("q=typescript&sort=stars").then(res =>
//    console.log(res)
//    );
queryCodeInRepo("q= NOT class AND type", "microsoft/vscode").then(res => console.log(res.total_count));
