import RatedProject from "./RatedProject";
import Project from "./Project";
import { IRatedProjectsApi } from "../interfaces";
export default class RatedProjectList {
    ratedProjects: RatedProject[];
    projects: Project[];
    api: IRatedProjectsApi;
    constructor(projects: Project[], api: IRatedProjectsApi);
    fill(): Promise<boolean>;
    getUnratedProjects(): Promise<Project[]>;
    getRatedFromFile(): Promise<RatedProject[]>;
    sort(): RatedProject[];
    top(to?: number): RatedProject[];
}
export declare const Info: () => void;
