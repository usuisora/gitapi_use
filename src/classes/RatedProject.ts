import * as _ from "lodash";
import Project from "./Project";
export default class RatedProject extends Project {
  name: string;
  stars: number;

  constructor(name: string, stars: number) {
    super(name);
    this.stars = stars;
  }
  static isTypeEqual(obj: object): boolean {
    return _.isEqual(Object.keys(obj), ["name", "stars"]);
  }
}
