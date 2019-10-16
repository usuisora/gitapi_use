import { Project, RatedProject } from "./types";
import AuthClient from "./classes/AuthClient";
import URL from "./classes/Url";
require("dotenv").config();

let api = process.env.API;
let codeApi = api + "code";
let repoApi = api + "repositories";
let client = new AuthClient(process.env.ACCESS_TOKEN);
let query: string = process.env.QUERY;

const projectsByPage = async (
  url: string,
  page: number = 1,
  projects: Project[] = []
): Promise<Project[]> => {
  try {
    let data = await client.request(url.toString());
    let new_projects = [
      projects,
      ...data.items.map(item => {
        name: item.full_name;
      })
    ];
    return page == 34
      ? new_projects
      : await projectsByPage(url, page + 1, new_projects);
  } catch (err) {
    console.log(err);
    return projects;
  }
};

export const projects = async () => {
  let url: URL = new URL(codeApi, query, client.access_token);
  let projects: Project[] = await projectsByPage(url.toString());
  return projects;
};

export const ratedProject = async (project: Project): Promise<RatedProject> => {
  let url: URL = new URL(
    repoApi,
    "?q=repo:" + project.name,
    client.access_token
  );
  let data = await client.request(url.toString());
  let rated: RatedProject = {
    name: project.name,
    stars: data.items[0].stargazers_count
  };
  return rated;
};

export const getRatedProjectList = async (
  projectList: Project[]
): Promise<RatedProject[]> => {
  return await Promise.all(
    projectList.map(async project => await ratedProject(project))
  );
};
