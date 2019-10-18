import Project from "./Project";
import RatedProject from "./RatedProject";
import { IApi, IProjectsApi, IRatedProjectsApi } from "../interfaces";
import AuthClient from "./AuthClient";
declare class GithubApi implements IApi, IProjectsApi, IRatedProjectsApi {
    api: string;
    codeApi: string;
    repoApi: string;
    client: AuthClient;
    query: string;
    rateLimitRemaining: number;
    maxResultsCount: number;
    constructor(api: any, token: any, query: any);
    initAsync(): Promise<void>;
    projectsByPage: (url: string, page?: number, projects?: Project[]) => Promise<Project[]>;
    fetchProjects: (fromPage?: number) => Promise<Project[]>;
    fetchRatedProject: (project: Project) => Promise<RatedProject>;
    fetchRatedProjects: (projectList: Project[]) => Promise<RatedProject[]>;
}
export default GithubApi;
