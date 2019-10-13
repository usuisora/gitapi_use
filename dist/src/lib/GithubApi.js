"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubClient = require("./GithubClient");
async function getProjectsRecursive(q, page, result) {
  const body = await GithubClient.getBody("code", q, page);
  if (body.items == undefined) return result;
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
  const body = await GithubClient.getBody("repositories", `repo:${project}`);
  return body.errors == undefined ? body.items[0].stargazers_count : 0;
}
exports.getStars = getStars;
function getRatedProjects(names) {
  return names.map(async name => {
    const stars = await getStars(name);
    return { name, stars };
  });
}
exports.getRatedProjects = getRatedProjects;
async function getSortedProjects(names, filter) {
  return await getRatedProjects(names).sort((a, b) => a[filter] > b[filter]);
}
exports.getSortedProjects = getSortedProjects;
async function getTopProjects(names) {
  const arr = await getSortedProjects(names, "stars");
  return arr.slice(0, 3);
}
exports.getTopProjects = getTopProjects;
