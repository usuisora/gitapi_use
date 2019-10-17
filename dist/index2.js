"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { project, ratedProject } from "./types";
const fs = require("fs");
const Project_1 = require("./classes/Project");
const main = async () => {
    // let projects = await fetch.projects;
    fs.writeFile("./test.json", JSON.stringify({
        name: "fd"
    }), err => {
        {
            if (err)
                console.log(err);
        }
        const p = JSON.parse(fs.readFileSync("./test.json").toString());
        console.log(Object.keys(p));
        console.log(Project_1.default.isTypeEqual(p));
    });
};
try {
    main();
    console.log("try");
}
catch (err) {
    console.log(err);
}
