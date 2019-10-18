"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectList_1 = __importDefault(require("./classes/ProjectList"));
const RatedProjectList_1 = __importDefault(require("./classes/RatedProjectList"));
const githubApi_1 = __importDefault(require("./classes/githubApi"));
const statistics_1 = __importDefault(require("./statistics"));
// change token
const { API, ACCESS_TOKEN, QUERY } = process.env;
const main = async () => {
    const api = new githubApi_1.default(API, ACCESS_TOKEN, QUERY);
    await api.initAsync();
    console.log("Rate Limit remaining: ", api.rateLimitRemaining, "\n");
    const projectList = new ProjectList_1.default(api);
    const isAllProjects = await projectList.fill();
    const ratedProjects = new RatedProjectList_1.default(projectList.projects, api);
    const isAllRated = await ratedProjects.fill();
    ratedProjects.top();
    if (isAllProjects && isAllRated) {
        // clearInterval(timer);
    }
    statistics_1.default();
};
let timer = setInterval(() => {
    main();
}, 1000 * 60 * 3);
main();
statistics_1.default();
