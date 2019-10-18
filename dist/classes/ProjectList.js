"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fsj = __importStar(require("../lib/fsj"));
const fs = __importStar(require("fs"));
exports.path = "./projects.json";
const lodash_1 = __importDefault(require("lodash"));
class ProjectList {
    constructor(api) {
        this.projects = [];
        this.api = api;
    }
    async fill() {
        let page = await this.getPage();
        if (page < 34) {
            if (this.api.rateLimitRemaining > 0) {
                await this.addProjectsToFile(page);
            }
            return false;
        }
        else {
            let result = await this.readProjectsFromFile();
            this.projects = [...result];
            return true;
        }
    }
    async addProjectsToFile(page) {
        let projects = page == 1 ? [] : await this.readProjectsFromFile();
        let new_projects = await this.api.fetchProjects(page);
        let res = lodash_1.default.uniqBy([...projects, ...new_projects], "name");
        await fsj.writeJSON("./projects.json", res);
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
            const page = await fsj.readJSON("./page.json");
            return page.value;
        }
        catch (err) {
            fsj.writeJSON("./page.json", { value: 1 });
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
exports.Info = () => {
    const buffer = fs.readFileSync("./projects.json");
    const projects = JSON.parse(buffer.toString());
    console.log(projects.length, "  projects");
};
