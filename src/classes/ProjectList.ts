import Project from "./Project";
import * as fsj from "../lib/fsj";
import * as fs from "fs";
import { IProjectsApi } from "../interfaces";
export const path = "./projects.json";
import _ from "lodash";
export default class ProjectList {
  projects: Project[];
  api: IProjectsApi;
  constructor(api: IProjectsApi) {
    this.projects = [];
    this.api = api;
  }
  async fill() {
    let page: number = await this.getPage();
    if (page < 34) {
      if (this.api.rateLimitRemaining > 0) {
        await this.addProjectsToFile(page);
      }
      return false;
    } else {
      let result: Project[] = await this.readProjectsFromFile();
      this.projects = [...result];
      return true;
    }
  }
  async addProjectsToFile(page: number) {
    let projects: Project[] =
      page == 1 ? [] : await this.readProjectsFromFile();
    let new_projects: Project[] = await this.api.fetchProjects(page);
    let res = _.uniqBy([...projects, ...new_projects], "name");
    await fsj.writeJSON("./projects.json", res);
  }
  async readProjectsFromFile(): Promise<Project[]> {
    try {
      return await fsj.readJSON(path);
    } catch (err) {
      throw new Error(err);
    }
  }
  async getPage(): Promise<number> {
    try {
      const page = await fsj.readJSON("./page.json");
      return page.value;
    } catch (err) {
      fsj.writeJSON("./page.json", { value: 1 });
      return 1;
    }
  }
}
export function toProjectList(arr): Project[] {
  return arr.map(i => {
    return {
      name: i.name
    };
  });
}

export const Info = () => {
  const buffer = fs.readFileSync("./projects.json");
  const projects = JSON.parse(buffer.toString());
  console.log(projects.length, "  projects");
};
