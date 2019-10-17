"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectList_1 = require("./classes/ProjectList");
const RatedProjectList_1 = require("./classes/RatedProjectList");
const main = async () => {
    let projectList = new ProjectList_1.default();
    await projectList.fill();
    let ratedProjects = new RatedProjectList_1.default(projectList.projects);
    await ratedProjects.fill();
    console.log(ratedProjects.top());
};
