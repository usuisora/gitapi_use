"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthClient_1 = __importDefault(require("./AuthClient"));
const Url_1 = __importDefault(require("./Url"));
const async_file_1 = __importDefault(require("async-file"));
const fsj = __importStar(require("../lib/fsj"));
require("dotenv").config();
class GithubApi {
    constructor(api, token, query) {
        this.projectsByPage = async (url, page = 1, projects = []) => {
            let data = await this.client.request(url.toString());
            if (data.items == undefined) {
                return projects;
            }
            this.rateLimitRemaining -= 1;
            let new_projects = [
                ...projects,
                ...data.items.map(item => {
                    return {
                        name: item.repository.full_name
                    };
                })
            ];
            fsj.writeJSON("./page.json", { value: page + 1 });
            return page == 34 || this.rateLimitRemaining == 0
                ? new_projects
                : await this.projectsByPage(url, page + 1, new_projects);
        };
        this.fetchProjects = async (fromPage = 1) => {
            let url = new Url_1.default(this.codeApi, this.query);
            let projects = await this.projectsByPage(url.toString(), fromPage);
            return projects;
        };
        this.fetchRatedProject = async (project) => {
            let url = new Url_1.default(this.repoApi, "repo:" + project.name);
            let data = await this.client.request(url.toString());
            this.rateLimitRemaining -= 1;
            let rated = {
                name: project.name,
                stars: data.items[0].stargazers_count
            };
            return rated;
        };
        this.fetchRatedProjects = async (projectList) => {
            return await Promise.all(projectList.map(async (project, index) => await this.fetchRatedProject(project)));
        };
        this.api = api;
        this.codeApi = this.api + "/code";
        this.repoApi = this.api + "/repositories";
        this.client = new AuthClient_1.default(token);
        this.query = query;
        this.maxResultsCount = 30;
        this.rateLimitRemaining = 0;
        "X-RateLimit-Remaining";
    }
    async initAsync() {
        let url = new Url_1.default(this.repoApi, this.query).toString();
        let rate = await this.client.getHeader(url, "X-RateLimit-Remaining");
        this.rateLimitRemaining = parseInt(rate) - 1;
        await async_file_1.default.writeFile("./rateLimitRemaining.txt", this.rateLimitRemaining);
    }
}
exports.default = GithubApi;
