"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubApi = require("./lib/GithubApi");
const fileWorker = require("./lib/fileWorker");
const bl = require("./lib/baseLib");
const fs = require("fs");
const projectsPath = __dirname + "/files/projects.json";
const ratedProjectsPath = __dirname + "/files/ratedProjects.json";
const query = "NOT class AND type+language:ts";
async function getProjectsFromFile(path) {
    let projectsFile = fileWorker.readJson(path);
    if (projectsFile.projects == undefined) {
        let projects = await GithubApi.getAllProjects(query);
        fileWorker.writeJson(path, {
            query: query,
            projects: await projects
        });
        return projects;
    }
    return projectsFile.projects;
}
function updateProjectsRate(path, diff, oldContent = null) {
    if (oldContent == null) {
        fs.readFile(path, (err, data) => {
            let oldContent = JSON.stringify(data);
            updateProjectsRate(path, diff, oldContent);
        });
    }
    let name = diff.pop();
    GithubApi.getStars(name).then(stars => {
        if (stars == -1) {
            console.log("doing");
            setTimeout(() => updateProjectsRate(path, [...diff, name], oldContent), 5000);
        }
        else {
            let newRated = [...oldContent, { name, stars }];
            let newJsonRate = JSON.stringify(newRated);
            fs.writeFile(path, newJsonRate, err => {
                updateProjectsRate(path, diff, newRated);
            });
        }
    });
}
function isRatedProjects() {
    fs.readFile(ratedProjectsPath, (err, data) => {
        if (err)
            return false;
        let rated = JSON.parse(data.toString());
        console.log(rated.length);
        // console.log(rat/ed[0].keys());
    });
}
isRatedProjects();
async function App() {
    let projectsNames = await getProjectsFromFile(projectsPath);
    console.log(projectsNames.length);
    fs.readFile(ratedProjectsPath, (err, data) => {
        const rated = data.length == 0 ? [] : fileWorker.BufferToJson(data);
        const ratedNames = rated.map(i => i.name);
        const diff = bl.arraysDiff(projectsNames, ratedNames);
        updateProjectsRate(ratedProjectsPath, diff, rated);
    });
}
App();
