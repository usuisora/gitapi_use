import Project from "./Project";
export default class RatedProject extends Project {
    name: string;
    stars: number;
    constructor(name: string, stars: number);
    static isTypeEqual(obj: object): boolean;
}
