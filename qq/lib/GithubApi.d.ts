export declare function getAllProjects(q: string): Promise<any>;
export declare function getProjects(q: string): Promise<any>;
export declare function getStars(project: string): Promise<number>;
export declare function getProjectsRate(names: string[]): Promise<{
    name: string;
    stars: number;
}[]>;
export declare function getSortedProjects(names: string[], comparison?: string): Promise<{
    name: string;
    stars: number;
}[]>;
export declare function getTopProjects(names: any, count?: number): Promise<{
    name: string;
    stars: number;
}[]>;
