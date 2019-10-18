import { Project, RatedProject } from "./types";
import AuthClient from "./classes/AuthClient";
import URL from "./classes/Url";
import fetch from "node-fetch";
// import Project from './classes/Project'
// import RatedProject
require("dotenv").config();

let api = process.env.API;
let codeApi = api + "/code";
let repoApi = api + "/repositories";
let client = new AuthClient(process.env.ACCESS_TOKEN);
let query: string = process.env.QUERY;
export const maxResultsCount: number = 30;
const projectsByPage = async (
  url: string,
  page: number = 1,
  projects: Project[] = []
): Promise<Project[]> => {
  try {
    let data = await client.request(url.toString());
    let new_projects: Project[] = [
      ...projects,
      ...data.items.map(item => {
        return {
          name: item.repository.full_name
        };
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

export const projects = async (fromPage: number = 1) => {
  let url: URL = new URL(codeApi, query);
  let projects: Project[] = await projectsByPage(url.toString(), fromPage);
  return projects;
};

export const ratedProject = async (project: Project): Promise<RatedProject> => {
  try {
    let url: URL = new URL(repoApi, "repo:" + project.name);
    let data = await client.request(url.toString());
    let rated: RatedProject = {
      name: project.name,
      stars: data.items[0].stargazers_count
    };
    return rated;
  } catch (err) {
    return {
      name: "none",
      stars: -1
    };
  }
};

export const ratedProjectList = async (
  projectList: Project[]
): Promise<RatedProject[]> => {
  return await Promise.all(
    projectList.map(async (project, index) => await ratedProject(project))
  );
};

export const RateLimitRemaining = async () => {
  const url: URL = new URL(repoApi, query);
  const response = await fetch(
    url.toString() + "&access_token=" + process.env.ACCESS_TOKEN
  );
  const limit = await response.headers;
  return await limit.get("X-RateLimit-Remaining");
};
