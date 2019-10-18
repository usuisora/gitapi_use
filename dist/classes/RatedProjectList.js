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
const fs = __importStar(require("fs"));
const ProjectList = __importStar(require("./ProjectList"));
const projectsPath = "./projects.json";
const ratedPath = "./ratedProjects.json";
class RatedProjectList {
    constructor(projects, api) {
        this.projects = projects;
        this.ratedProjects = [];
        this.api = api;
    }
    async fill() {
        this.ratedProjects = await this.getRatedFromFile();
        let unrated = await this.getUnratedProjects();
        if (unrated.length == 0) {
            return true;
        }
        if (this.api.rateLimitRemaining != 0) {
            let ratedFromUnrated = await this.api.fetchRatedProjects(unrated.slice(0, this.api.rateLimitRemaining));
            let newRated = ratedFromUnrated.filter(rp => rp.stars >= 0);
            this.ratedProjects = _.uniqBy([...this.ratedProjects, ...newRated], "name");
            await fsj.writeJSON(ratedPath, this.ratedProjects);
        }
        return false;
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
exports.Info = () => {
    const buffer = fs.readFileSync("./ratedProjects.json");
    const projects = JSON.parse(buffer.toString());
    console.log(projects.length, " rated projects");
};
