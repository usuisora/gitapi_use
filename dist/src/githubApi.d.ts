import { project, ratedProject } from './types';
export declare const projects: () => Promise<project[]>;
declare const ratedProject: (project: project) => Promise<ratedProject>;
export declare const getRatedProjectList: (projectList: project[]) => Promise<ratedProject[]>;
export {};
