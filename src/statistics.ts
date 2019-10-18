import { Info as projectsInfo } from "./classes/ProjectList";
import { Info as ratedInfo } from "./classes/RatedProjectList";
import RatedProject from "./classes/RatedProject";
import fs from "fs";

const logStatistics = () => {
  projectsInfo();
  ratedInfo();
  fs.readFile("./top.json", (err, buffer) => {
    let top: RatedProject[] = JSON.parse(buffer.toString());
    top.map((el, ind) => {
      console.log(`${ind}. project: ${el.name} - stars:  ${el.stars}`);
    });
  });
  console.log("\n\n");
};

export default logStatistics;
