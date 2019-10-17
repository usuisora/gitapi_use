import * as _ from "lodash";
import * as fsj from "../lib/fsj";
import RatedProject from "./RatedProject";
import Project from "./Project";
import * as ProjectList from "./ProjectList";
import * as fetch from "../githubApi";

const projectsPath = "./projects.json";
const ratedPath = "./ratedProjects.json";

export default class RatedProjectList {
  ratedProjects: RatedProject[];
  projects: Project[];
  constructor(projects: Project[]) {
    this.projects = projects;
    this.ratedProjects = [];
  }
  async fill() {
    this.ratedProjects = await this.getRatedFromFile();
    let unrated: Project[] = await this.getUnratedProjects();
    if (unrated.length == 0) {
      return;
    }
    let ratedFromUnrated: RatedProject[] = await fetch.ratedProjectList(
      unrated
    );
    this.ratedProjects = [...this.ratedProjects, ...ratedFromUnrated];
    await fsj.writeJSON(ratedPath, this.ratedProjects);
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
  sort = (): RatedProject[] => {
    return this.ratedProjects.sort((a, b) => b.stars - a.stars);
  };
  top = (to: number = 3): RatedProject[] => {
    await fsj.writeJSON(top)
    return 
  };
}
