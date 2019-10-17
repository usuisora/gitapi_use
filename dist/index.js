"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectList_1 = require("./classes/ProjectList");
const RatedProjectList_1 = require("./classes/RatedProjectList");
const fs = require("fs");
const main = async () => {
    let projects = new ProjectList_1.default();
    await projects.fill();
    let ratedProjects = new RatedProjectList_1.default();
    console.log(ratedProjects.top());
};
let page = fs.readFileSync("./page.txt");
console.log(page);
