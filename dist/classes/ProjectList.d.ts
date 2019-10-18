import Project from "./Project";
import { IProjectsApi } from "../interfaces";
export declare const path = "./projects.json";
export default class ProjectList {
    projects: Project[];
    api: IProjectsApi;
    constructor(api: IProjectsApi);
    fill(): Promise<boolean>;
    addProjectsToFile(page: number): Promise<void>;
    readProjectsFromFile(): Promise<Project[]>;
    getPage(): Promise<number>;
}
export declare function toProjectList(arr: any): Project[];
export declare const Info: () => void;
