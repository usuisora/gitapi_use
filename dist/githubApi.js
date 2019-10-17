"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthClient_1 = __importDefault(require("./classes/AuthClient"));
const Url_1 = __importDefault(require("./classes/Url"));
// import Project from './classes/Project'
// import RatedProject
require("dotenv").config();
let api = process.env.API;
let codeApi = api + "/code";
let repoApi = api + "/repositories";
let client = new AuthClient_1.default(process.env.ACCESS_TOKEN);
let query = process.env.QUERY;
exports.maxResultsCount = 30;
const projectsByPage = async (url, page = 1, projects = []) => {
    try {
        let data = await client.request(url.toString());
        let new_projects = [
            ...projects,
            ...data.items.map(item => {
                return {
                    name: item.repository.full_name
                };
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
exports.projects = async (fromPage = 1) => {
    let url = new Url_1.default(codeApi, query);
    let projects = await projectsByPage(url.toString(), fromPage);
    return projects;
};
exports.ratedProject = async (project, delay = 100) => {
    try {
        let url = new Url_1.default(repoApi, "repo:" + project.name);
        let data = await client.request(url.toString(), delay);
        let rated = {
            name: project.name,
            stars: data.items[0].stargazers_count
        };
        return rated;
    }
    catch (err) {
        return {
            name: "none",
            stars: -1
        };
    }
};
exports.ratedProjectList = async (projectList) => {
    return await Promise.all(projectList.map(async (project, index) => await exports.ratedProject(project, (index + 1) * 1000)));
};
