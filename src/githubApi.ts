import Project from "./classes/Project";
import RatedProject from "./classes/RatedProject";
import { IApi, IProjectsApi, IRatedProjectsApi  } from './interfaces'
import AuthClient from "./classes/AuthClient";
import URL from "./classes/Url";
import fetch from "node-fetch";
import fs from "async-file";
require("dotenv").config();



class githubApi implements IApi, IProjectsApi, IRatedProjectsApi {
  api: string;
  codeApi: string;
  repoApi: string;
  client: AuthClient;
  query: string;
  rateLimitRemaining: number;
  maxResultsCount: number;
  constructor() {
    this.api = process.env.API;
    this.codeApi = this.api + "/code";
    this.repoApi = this.api + "/repositories";
    this.client = new AuthClient(process.env.ACCESS_TOKEN);
    this.query = process.env.QUERY;
    this.maxResultsCount = 30;
    this.rateLimitRemaining = 0;
    "X-RateLimit-Remaining";
  }
  async initAsync() {
    let url = new URL(this.repoApi, this.query).toString();
    let rate = await this.client.getHeader(url, "X-RateLimit-Remaining");
    this.RateLimitRemaining = rate;
    await fs.writeFile("./rateLimitRemaining.txt", this.RateLimitRemaining);
  }
  projectsByPage = async (
    url: string,
    page: number = 1,
    projects: Project[] = []
  ): Promise<Project[]> => {
    try {
      let data = await this.client.request(url.toString());
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
        : await this.projectsByPage(url, page + 1, new_projects);
    } catch (err) {
      console.log(err);
      return projects;
    }
  };

  fetchProjects = async (fromPage: number = 1) => {
    let url: URL = new URL(this.codeApi, this.query);
    let projects: Project[] = await this.projectsByPage(
      url.toString(),
      fromPage
    );
    return projects;
  };

  fetchRatedProject = async (project: Project): Promise<RatedProject> => {
    try {
      let url: URL = new URL(this.repoApi, "repo:" + project.name);
      let data = await this.client.request(url.toString());
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

  fetchRatedProjects = async (
    projectList: Project[]
  ): Promise<RatedProject[]> => {
    return await Promise.all(
      projectList.map(async (project, index) => await this.fetchRatedProject(project))
    );
  };

  RateLimitRemaining = async () => {
    const url: URL = new URL(this.repoApi, this.query);
    const response = await fetch(
      url.toString() + "&access_token=" + process.env.ACCESS_TOKEN
    );
    const limit = await response.headers;
    return await limit.get("X-RateLimit-Remaining");
  };
}

export default githubApi