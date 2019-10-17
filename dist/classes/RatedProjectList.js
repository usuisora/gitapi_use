"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const fsj = require("../lib/fsj");
const ProjectList = require("./ProjectList");
const fetch = require("../githubApi");
const projectsPath = "./projects.json";
const ratedPath = "./ratedProjects.json";
class RatedProjectList {
    constructor(projects) {
        this.sort = () => {
            return this.ratedProjects.sort((a, b) => b.stars - a.stars);
        };
        this.top = (to = 3) => {
            this.sort().slice(0, to);
        };
        this.projects = projects;
        this.ratedProjects = [];
    }
    async fill() {
        this.ratedProjects = await this.getRatedFromFile();
        let unrated = await this.getUnratedProjects();
        let ratedFromUnrated = await fetch.ratedProjectList(unrated);
        this.ratedProjects = [...this.ratedProjects, ...ratedFromUnrated];
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
}
exports.default = RatedProjectList;
