import Project from "./Project";
import * as fs from "fs";
export default class ProjectList {
  projects: Project[];
  fill() {
    let page: number = readPageFromFile();
    if(page < 34){
        this.addProjectsToFile(page:number)
    }else{
        let result: Project[] = this.readProjectsFromFile()
        return result
    }

  }
    addProjectsToFile(){
        
        let new_projects = fetch.Projects
        fs.writeFileSync('./projects')
    }

    readProjectsFromFile(){

    }
  constructor() {
    projects: this.fill();
  }
}

function readPageFromFile(): number {
  try {
    let page = Number(fs.readFileSync("./page"));
  } catch {
    return 1;
  }
}
