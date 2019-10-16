import ProjectList from "./classes/ProjectList";
import RatedProjectList from "./classes/RatedProjectList";

import * as fs from "fs";

const main = async () => {
  let projects = new ProjectList();
  let ratedProjects = new RatedProjectList();
  console.log(ratedProjects.top())
};

let page = fs.readFileSync("./page.txt");
console.log(page);
