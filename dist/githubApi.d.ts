import { Project, RatedProject } from "./types";
export declare const maxResultsCount: number;
export declare const projects: (fromPage?: number) => Promise<Project[]>;
export declare const ratedProject: (project: Project) => Promise<RatedProject>;
export declare const ratedProjectList: (projectList: Project[]) => Promise<RatedProject[]>;
