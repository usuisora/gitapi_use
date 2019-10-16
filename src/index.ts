import * as fetch from "./githubApi";
import { file } from "@babel/types";
// import { project, ratedProject } from "./types";
import * as fs from "fs";
import Project from "./classes/Project";

const main = async () => {
  // let projects = await fetch.projects;
  fs.writeFile(
    "./test.json",
    JSON.stringify({
      data: 1
    }),
    err => {
      {
        if (err) console.log(err);
      }
      const p: Project = JSON.parse(fs.readFileSync("./test.json").toString());
      console.log(Project.isTypeEqual(p));

      console.log(p);
    }
  );
};

try {
  main();
  console.log("try");
} catch (err) {
  console.log(err);
}
