import ProjectList from "./classes/ProjectList";
import RatedProjectList from "./classes/RatedProjectList";
import * as fsj from "./lib/fsj";
import GithubApi from "./classes/githubApi";
import logStatistics from "./statistics";
// change token
const { API, ACCESS_TOKEN, QUERY } = process.env;

const main = async () => {
  const api = new GithubApi(API, ACCESS_TOKEN, QUERY);
  await api.initAsync();
  console.log("Rate Limit remaining: ", api.rateLimitRemaining, "\n");

  const projectList = new ProjectList(api);
  const isAllProjects = await projectList.fill();

  const ratedProjects = new RatedProjectList(projectList.projects, api);
  const isAllRated = await ratedProjects.fill();
  ratedProjects.top();

  if (isAllProjects && isAllRated) {
    // clearInterval(timer);
  }
  logStatistics();
};

let timer = setInterval(() => {
  main();
}, 1000 * 60 * 3);
main();
logStatistics();
