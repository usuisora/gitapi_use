import { RatedProject } from "../types";

export default class RatedProjectList {
  value: RatedProject[];
  constructor(value?: RatedProject[]) {
    // if(!value){
    //   let
    // }
    this.value = value;
  }
  sort = (): RatedProject[] => {
    return this.value.sort((a, b) => b.stars - a.stars);
  };
  top = (to: number = 3) => {
    this.sort().slice(0, to);
  };
}
