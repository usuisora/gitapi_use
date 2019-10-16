import { RatedProject } from "../types";

class RatedProjectList {
  value: RatedProject[];
  constructor(value: RatedProject[]) {
    this.value = value;
  }
  sort = (): RatedProject[] => {
    return this.value.sort((a, b) => b.stars - a.stars);
  };
  top = (to: number = 3) => {
    this.sort().slice(0, to);
  };
}
