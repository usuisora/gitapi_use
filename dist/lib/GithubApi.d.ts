export declare function getAllProjects(q: string): Promise<any>;
export declare function getStars(project: string): Promise<any>;
export declare function getRatedProjects(names: string[]): Promise<{
    name: string;
    stars: any;
}[]>;
