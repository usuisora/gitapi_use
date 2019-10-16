export default class Project {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  static isTypeEqual(obj) {
    return Object.keys(obj) == ["name"];
  }
}


// import Project from "../classes/Project";
