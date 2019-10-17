import Project from "./Project";
import * as fsj from "../lib/fsj";
import * as fetch from "../githubApi";
export const path = "./projects.json";
export default class ProjectList {
  projects: Project[];
  constructor() {
    this.projects = [];
  }
  async fill() {
    let page: number = await this.getPage();
    if (page < 34) {
      await this.addProjectsToFile(page);
    } else {
      let result: Project[] = await this.readProjectsFromFile();
      return result;
    }
  }
  async addProjectsToFile(page: number) {
    let projects: Project[] =
      page == 1 ? [] : await this.readProjectsFromFile();
    let new_projects: Project[] = await fetch.projects(page);
    let data = [...projects, ...new_projects];
    await fsj.writeJSON("./projects.json", data);
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
      let projects: Project[] = await this.readProjectsFromFile();
      return Math.floor(projects.length / fetch.maxResultsCount);
    } catch (err) {
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
