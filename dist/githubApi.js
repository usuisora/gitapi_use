"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthClient_1 = __importDefault(require("./classes/AuthClient"));
const Url_1 = __importDefault(require("./classes/Url"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const async_file_1 = __importDefault(require("async-file"));
require("dotenv").config();
class githubApi {
    constructor() {
        this.projectsByPage = async (url, page = 1, projects = []) => {
            try {
                let data = await this.client.request(url.toString());
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
                    : await this.projectsByPage(url, page + 1, new_projects);
            }
            catch (err) {
                console.log(err);
                return projects;
            }
        };
        this.fetchProjects = async (fromPage = 1) => {
            let url = new Url_1.default(this.codeApi, this.query);
            let projects = await this.projectsByPage(url.toString(), fromPage);
            return projects;
        };
        this.fetchRatedProject = async (project) => {
            try {
                let url = new Url_1.default(this.repoApi, "repo:" + project.name);
                let data = await this.client.request(url.toString());
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
        this.fetchRatedProjects = async (projectList) => {
            return await Promise.all(projectList.map(async (project, index) => await this.fetchRatedProject(project)));
        };
        this.RateLimitRemaining = async () => {
            const url = new Url_1.default(this.repoApi, this.query);
            const response = await node_fetch_1.default(url.toString() + "&access_token=" + process.env.ACCESS_TOKEN);
            const limit = await response.headers;
            return await limit.get("X-RateLimit-Remaining");
        };
        this.api = process.env.API;
        this.codeApi = this.api + "/code";
        this.repoApi = this.api + "/repositories";
        this.client = new AuthClient_1.default(process.env.ACCESS_TOKEN);
        this.query = process.env.QUERY;
        this.maxResultsCount = 30;
        this.rateLimitRemaining = 0;
        "X-RateLimit-Remaining";
    }
    async initAsync() {
        let url = new Url_1.default(this.repoApi, this.query).toString();
        let rate = await this.client.getHeader(url, "X-RateLimit-Remaining");
        this.RateLimitRemaining = rate;
        await async_file_1.default.writeFile("./rateLimitRemaining.txt", this.RateLimitRemaining);
    }
}
exports.default = githubApi;
