import Project from "./Project";
import RatedProject from "./RatedProject";
import { IApi, IProjectsApi, IRatedProjectsApi } from "../interfaces";
import AuthClient from "./AuthClient";
import URL from "./Url";
import fs from "async-file";
import { writeJSON } from "../lib/fsj";
import * as fsj from "../lib/fsj";

require("dotenv").config();

class GithubApi implements IApi, IProjectsApi, IRatedProjectsApi {
  api: string;
  codeApi: string;
  repoApi: string;
  client: AuthClient;
  query: string;
  rateLimitRemaining: number;
  maxResultsCount: number;
  constructor(api, token, query) {
    this.api = api;
    this.codeApi = this.api + "/code";
    this.repoApi = this.api + "/repositories";
    this.client = new AuthClient(token);
    this.query = query;
    this.maxResultsCount = 30;
    this.rateLimitRemaining = 0;
    "X-RateLimit-Remaining";
  }
  async initAsync() {
    let url = new URL(this.repoApi, this.query).toString();
    let rate = await this.client.getHeader(url, "X-RateLimit-Remaining");
    this.rateLimitRemaining = parseInt(rate) - 1;
    if (this.rateLimitRemaining == NaN) {
      throw Error("BED TOKEN\n");
    }
    await fs.writeFile("./rateLimitRemaining.txt", this.rateLimitRemaining);
  }

  projectsByPage = async (
    url: string,
    page: number = 1,
    projects: Project[] = []
  ): Promise<Project[]> => {
    let data = await this.client.request(url.toString());
    if (data.items == undefined) {
      return projects;
    }
    this.rateLimitRemaining -= 1;
    let new_projects = [
      ...projects,
      ...data.items.map(item => {
        return {
          name: item.repository.full_name
        };
      })
    ];
    fsj.writeJSON("./page.json", { value: page + 1 });
    return page == 34 || this.rateLimitRemaining == 0
      ? new_projects
      : await this.projectsByPage(url, page + 1, new_projects);
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
    let url: URL = new URL(this.repoApi, "repo:" + project.name);
    let data = await this.client.request(url.toString());
    if (data.items == undefined) {
      return {
        name: "error 403 forbidden",
        stars: -1
      };
    }
    this.rateLimitRemaining -= 1;
    let rated: RatedProject = {
      name: project.name,
      stars: data.items[0].stargazers_count
    };
    return rated;
  };

  fetchRatedProjects = async (
    projectList: Project[]
  ): Promise<RatedProject[]> => {
    return await Promise.all(
      projectList.map(
        async (project, index) => await this.fetchRatedProject(project)
      )
    );
  };
}

export default GithubApi;
