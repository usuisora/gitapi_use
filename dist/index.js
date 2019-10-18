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
const ProjectList_1 = __importDefault(require("./classes/ProjectList"));
const RatedProjectList_1 = __importDefault(require("./classes/RatedProjectList"));
const fsj = __importStar(require("./lib/fsj"));
const githubApi_1 = __importDefault(require("./classes/githubApi"));
const statistics_1 = __importDefault(require("./statistics"));
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
        clearInterval(timer);
    }
    const top = ratedProjects.top();
    fsj.writeJSON("./top.json", top);
    console.log(top);
};
let timer = setInterval(() => {
    statistics_1.default();
    main();
}, 1000 * 60 * 3);
statistics_1.default();
