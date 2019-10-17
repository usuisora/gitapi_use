"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const fsj = __importStar(require("../lib/fsj"));
const ProjectList = __importStar(require("./ProjectList"));
const fetch = __importStar(require("../githubApi"));
const projectsPath = "./projects.json";
const ratedPath = "./ratedProjects.json";
class RatedProjectList {
    constructor(projects) {
        this.projects = projects;
        this.ratedProjects = [];
    }
    async fill() {
        this.ratedProjects = await this.getRatedFromFile();
        let unrated = await this.getUnratedProjects();
        if (unrated.length == 0) {
            return;
        }
        let ratedFromUnrated = await fetch.ratedProjectList(unrated);
        let newRated = ratedFromUnrated.filter(rp => rp.stars >= 0);
        this.ratedProjects = [...this.ratedProjects, ...newRated];
        await fsj.writeJSON(ratedPath, this.ratedProjects);
    }
    async getUnratedProjects() {
        let rated = await this.getRatedFromFile();
        if (rated.length == 0) {
            return this.projects;
        }
        else {
            let ratedNamesArr = ProjectList.toProjectList(rated);
            return _.difference(this.projects, ratedNamesArr);
        }
    }
    async getRatedFromFile() {
        try {
            return await fsj.readJSON(ratedPath);
        }
        catch (err) {
            return [];
        }
    }
    sort() {
        return this.ratedProjects.sort((a, b) => b.stars - a.stars);
    }
    top(to = 3) {
        return this.sort().slice(0, to);
    }
}
exports.default = RatedProjectList;
