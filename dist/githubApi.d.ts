import Project from "./classes/Project";
import RatedProject from "./classes/RatedProject";
import { IApi, IProjectsApi, IRatedProjectsApi } from './interfaces';
import AuthClient from "./classes/AuthClient";
declare class githubApi implements IApi, IProjectsApi, IRatedProjectsApi {
    api: string;
    codeApi: string;
    repoApi: string;
    client: AuthClient;
    query: string;
    rateLimitRemaining: number;
    maxResultsCount: number;
    constructor();
    initAsync(): Promise<void>;
    projectsByPage: (url: string, page?: number, projects?: Project[]) => Promise<Project[]>;
    fetchProjects: (fromPage?: number) => Promise<Project[]>;
    fetchRatedProject: (project: Project) => Promise<RatedProject>;
    fetchRatedProjects: (projectList: Project[]) => Promise<RatedProject[]>;
    RateLimitRemaining: () => Promise<any>;
}
export default githubApi;
