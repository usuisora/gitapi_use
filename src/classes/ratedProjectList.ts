import { ratedProject } from "../types";

class ratedProjectList {
  value: ratedProject[];
  constructor(value: ratedProject[]) {
    this.value = value;
  }
  sort = (): ratedProject[] => {
    return this.value.sort((a, b) => b.stars - a.stars);
  };
  top = (to: number = 3) => {
    this.sort().slice(0, to);
  };
}
