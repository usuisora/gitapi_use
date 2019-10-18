import * as _ from "lodash";
import * as fsj from "../lib/fsj";
import * as fs from "fs";
import RatedProject from "./RatedProject";
import Project from "./Project";
import * as ProjectList from "./ProjectList";
import { IRatedProjectsApi } from "../interfaces";
const projectsPath = "./projects.json";
const ratedPath = "./ratedProjects.json";

export default class RatedProjectList {
  ratedProjects: RatedProject[];
  projects: Project[];
  api: IRatedProjectsApi;
  constructor(projects: Project[], api: IRatedProjectsApi) {
    this.projects = projects;
    this.ratedProjects = [];
    this.api = api;
  }
  async fill() {
    this.ratedProjects = await this.getRatedFromFile();
    let unrated: Project[] = await this.getUnratedProjects();
    if (unrated.length == 0) {
      return true;
    }
    if (this.api.rateLimitRemaining != 0) {
      let ratedFromUnrated: RatedProject[] = await this.api.fetchRatedProjects(
        unrated.slice(0, this.api.rateLimitRemaining)
      );
      let newRated = ratedFromUnrated.filter(rp => rp.stars >= 0);

      this.ratedProjects = _.uniqBy(
        [...this.ratedProjects, ...newRated],
        "name"
      );
      await fsj.writeJSON(ratedPath, this.ratedProjects);
    }
    return false;
  }
  async getUnratedProjects(): Promise<Project[]> {
    let rated: RatedProject[] = await this.getRatedFromFile();
    if (rated.length == 0) {
      return this.projects;
    } else {
      let ratedNamesArr: Project[] = ProjectList.toProjectList(rated);
      return _.difference(this.projects, ratedNamesArr) as Project[];
    }
  }

  async getRatedFromFile(): Promise<RatedProject[]> {
    try {
      return await fsj.readJSON(ratedPath);
    } catch (err) {
      return [];
    }
  }
  sort(): RatedProject[] {
    return this.ratedProjects.sort((a, b) => b.stars - a.stars);
  }
  top(to: number = 3): RatedProject[] {
    return this.sort().slice(0, to);
  }
}

export const Info = () => {
  const buffer = fs.readFileSync("./ratedProjects.json");
  const projects = JSON.parse(buffer.toString());
  console.log(projects.length, " rated projects");
};
