"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectList_1 = require("./classes/ProjectList");
const RatedProjectList_1 = require("./classes/RatedProjectList");
const fs_1 = __importDefault(require("fs"));
const logStatistics = () => {
    console.log('\t\nUnique repositories from requests: ');
    ProjectList_1.Info();
    RatedProjectList_1.Info();
    fs_1.default.readFile("./top.json", (err, buffer) => {
        let top = JSON.parse(buffer.toString());
        top.map((el, ind) => {
            console.log(`${ind + 1}. project: ${el.name} - stars:  ${el.stars}`);
        });
    });
    console.log("\n\n");
};
exports.default = logStatistics;
