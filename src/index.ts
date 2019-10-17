import ProjectList from "./classes/ProjectList";
import RatedProjectList from "./classes/RatedProjectList";
import { Project } from "./types";

const main = async () => {
  let projectList = new ProjectList();
  await projectList.fill();
  let ratedProjects = new RatedProjectList(projectList.projects);
  await ratedProjects.fill();
  console.log(ratedProjects.top());
};

main();
