import Project from './Project'
class RatedProject extends Project {
    name: string;
    stars: number;
    constructor(name: string, stars: number) {
        super(name);
        this.stars = stars;
    }
    static isTypeEqual(obj: object): boolean {
        return Object.keys(obj) == ["name", "stars"];
    }
}
