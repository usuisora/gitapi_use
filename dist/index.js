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
const RatedProjectList_1 = __importDefault(require("./classes/RatedProjectList"));
const fsj = __importStar(require("./lib/fsj"));
const githubApi = __importStar(require("./githubApi"));
const main = async () => {
    ///version 1
    // let projectList = new ProjectList();
    // await projectList.fill();
    // let ratedProjects = new RatedProjectList(projectList.projects);
    // await ratedProjects.fill();
    let api = new githubApi();
    let projectList = await fsj.readJSON("./projects.json");
    let ratedProjects = new RatedProjectList_1.default(projectList);
    await ratedProjects.fill();
    // console.log(ratedProjects.top());
};
// githubApi.RateLimitRemaining().then(res => {
//   console.log(res);
// });
