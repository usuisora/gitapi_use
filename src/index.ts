import ProjectList from "./classes/ProjectList";
import RatedProjectList from "./classes/RatedProjectList";
import * as fsj from "./lib/fsj";

import * as githubApi from "./githubApi";
const main = async () => {
  ///version 1

  // let projectList = new ProjectList();
  // await projectList.fill();
  // let ratedProjects = new RatedProjectList(projectList.projects);
  // await ratedProjects.fill();
  let api = new githubApi();
  let projectList = await fsj.readJSON("./projects.json");
  let ratedProjects = new RatedProjectList(projectList);
  await ratedProjects.fill();
  // console.log(ratedProjects.top());
};

// githubApi.RateLimitRemaining().then(res => {
//   console.log(res);
// });
