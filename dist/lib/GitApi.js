"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GitClient = require("./GitClient");
async function getProjectsRecursive(q, page, result) {
    const body = await GitClient.getBody("code", q, page);
    if (body.items == undefined)
        return result;
    body.items.map(item => result.push(item.repository.full_name));
    return getProjectsRecursive(q, page + 1, result);
}
async function getAllProjects(q) {
    console.log("wait please analizing...");
    return await getProjectsRecursive(q, 1, []);
}
exports.getAllProjects = getAllProjects;
// https://api.github.com/search/repositories?q=repo:microsoft/typescript
async function getStars(project) {
    const q = `repo:${project}`;
    const body = await GitClient.getBody("repositories", `repo:${project}`);
    return await body.items[0].stargazers_count;
}
exports.getStars = getStars;
// async function getTop3Project(full_names){
//   let ratingProjects = []
// }
