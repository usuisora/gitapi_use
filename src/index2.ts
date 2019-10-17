import * as fetch from "./githubApi";
// import { project, ratedProject } from "./types";
import * as fs from "fs";
import Project from "./classes/Project";
import * as _ from "lodash";
const main = async () => {
  // let projects = await fetch.projects;
  fs.writeFile(
    "./test.json",
    JSON.stringify({
      name: "fd"
    }),
    err => {
      {
        if (err) console.log(err);
      }
      const p: Project = JSON.parse(fs.readFileSync("./test.json").toString());
      console.log(Object.keys(p));

      console.log(Project.isTypeEqual(p));
    }
  );
};

try {
  main();
  console.log("try");
} catch (err) {
  console.log(err);
}
