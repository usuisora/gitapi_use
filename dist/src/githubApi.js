"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthClient_1 = require("./classes/AuthClient");
const Url_1 = require("./classes/Url");
require("dotenv").config();
let api = process.env.API;
let codeApi = api + "code";
let repoApi = api + "repositories";
let client = new AuthClient_1.default(process.env.ACCESS_TOKEN);
let query = process.env.QUERY;
const projectsByPage = async (url, page = 1, projects = []) => {
    try {
        let data = await client.request(url.toString());
        let new_projects = [
            projects,
            ...data.items.map(item => {
                name: item.full_name;
            })
        ];
        return page == 34
            ? new_projects
            : await projectsByPage(url, page + 1, new_projects);
    }
    catch (err) {
        console.log(err);
        return projects;
    }
};
exports.projects = async () => {
    let url = new Url_1.default(codeApi, query, client.access_token);
    let projects = await projectsByPage(url.toString());
    return projects;
};
const ratedProject = async (project) => {
    let url = new Url_1.default(repoApi, "?q=repo:" + project.name, client.access_token);
    let data = await client.request(url.toString());
    let rated = {
        name: project.name,
        stars: data.items[0].stargazers_count
    };
    return rated;
};
exports.getRatedProjectList = async (projectList) => {
    return await Promise.all(projectList.map(async (project) => await ratedProject(project)));
};
