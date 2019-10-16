"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubClient = require("./GithubClient");
async function getProjectsRecursive(q, page, result) {
    const body = await GithubClient.getBody("code", q, page);
    if (body.message)
        console.log(body.message);
    if (body.items == undefined || page == 7)
        return result;
    body.items.map(item => result.push(item.repository.full_name));
    return await getProjectsRecursive(q, page + 1, result);
}
async function getAllProjects(q) {
    console.log("wait please analyzing...");
    return await getProjectsRecursive(q, 1, []);
}
exports.getAllProjects = getAllProjects;
async function getProjects(q) {
    const body = await GithubClient.getBody("code", q);
    if (body.items == undefined)
        return [];
    return body.items.map(item => item.repository.full_name);
}
exports.getProjects = getProjects;
// https://api.github.com/search/repositories?q=repo:microsoft/typescript
async function getStars(project) {
    const q = `repo:${project}`;
    const body = await GithubClient.getBody("repositories", `repo:${project}`);
    if (!body.items) {
        return -1;
    }
    return body.items[0].stargazers_count;
}
exports.getStars = getStars;
async function getProjectsRate(names) {
    console.log("getting Rate...");
    return await Promise.all(names.map(async (name) => {
        const stars = await getStars(name);
        return await { name, stars };
    }));
}
exports.getProjectsRate = getProjectsRate;
async function getSortedProjects(names, comparison = "stars") {
    const rated = await getProjectsRate(names);
    return rated.sort((a, b) => b[comparison] - a[comparison]);
}
exports.getSortedProjects = getSortedProjects;
async function getTopProjects(names, count = 1) {
    const sorted = await getSortedProjects(names, "stars");
    return sorted.slice(0, count);
}
exports.getTopProjects = getTopProjects;
