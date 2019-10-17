import { Project, RatedProject } from "./types";
export declare const projects: (fromPage?: number) => Promise<Project[]>;
export declare const ratedProject: (project: Project) => Promise<RatedProject>;
export declare const getRatedProjectList: (projectList: Project[]) => Promise<RatedProject[]>;
