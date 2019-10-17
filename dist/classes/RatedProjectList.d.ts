import RatedProject from "./RatedProject";
import Project from "./Project";
export default class RatedProjectList {
    ratedProjects: RatedProject[];
    projects: Project[];
    constructor(projects: Project[]);
    fill(): Promise<void>;
    getUnratedProjects(): Promise<Project[]>;
    getRatedFromFile(): Promise<RatedProject[]>;
    sort(): RatedProject[];
    top(to?: number): RatedProject[];
}
