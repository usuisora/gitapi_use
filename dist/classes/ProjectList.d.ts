import Project from "./Project";
export declare const path = "./projects.json";
export default class ProjectList {
    projects: Project[];
    constructor();
    fill(): Promise<Project[]>;
    addProjectsToFile(page: number): Promise<void>;
    readProjectsFromFile(): Promise<Project[]>;
    getPage(): Promise<number>;
}
export declare function toProjectList(arr: any): Project[];
