import * as _ from "lodash";

export default class Project {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  static isTypeEqual(obj): boolean {
    return _.isEqual(Object.keys(obj), ["name"]);
  }
}

// import Project from "../classes/Project";
