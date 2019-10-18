import Project from "./classes/Project";
import Client from "./classes/Client";
export interface IApi {
    api: string;
    client: Client;
    maxResultsCount: number;
    rateLimitRemaining: number;
}
export interface IProjectsApi extends IApi {
    fetchProjects(page: number): any;
}
export interface IRatedProjectsApi extends IApi {
    fetchRatedProjects(projectList: Project[]): any;
}
