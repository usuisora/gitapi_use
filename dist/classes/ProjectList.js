"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsj = require("../lib/fsj");
const fetch = require("../githubApi");
exports.path = "./projects.json";
class ProjectList {
    constructor() {
        this.projects = [];
    }
    async fill() {
        let page = await this.getPage();
        if (page < 34) {
            await this.addProjectsToFile(page);
        }
        else {
            let result = await this.readProjectsFromFile();
            return result;
        }
    }
    async addProjectsToFile(page) {
        let projects = page == 1 ? [] : await this.readProjectsFromFile();
        let new_projects = await fetch.projects(page);
        let data = [...projects, ...new_projects];
        await fsj.writeJSON("./projects.json", data);
    }
    async readProjectsFromFile() {
        try {
            return await fsj.readJSON(exports.path);
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async getPage() {
        try {
            let projects = await this.readProjectsFromFile();
            return Math.floor(projects.length / fetch.maxResultsCount);
        }
        catch (err) {
            return 1;
        }
    }
}
exports.default = ProjectList;
function toProjectList(arr) {
    return arr.map(i => {
        return {
            name: i.name
        };
    });
}
exports.toProjectList = toProjectList;
