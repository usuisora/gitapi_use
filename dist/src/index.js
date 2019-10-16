"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const main = async () => {
    // let projects = await fetch.projects;
    fs.writeFileSync("./projects.json", "ffa");
};
try {
    main();
}
catch (err) {
    console.log(err);
}
