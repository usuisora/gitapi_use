import fetch from "node-fetch";
import { dirs } from "./types";
import * as GithubApi from "./lib/GithubApi";
import * as fileWorker from "./lib/fileWorker";

async function App() {
  const query = "NOT class AND type+language:ts";
  // gettingProjects
  const projects: string[] = await GithubApi.getProjects(query);
  let data = {
    query,
    projects
  };
  fileWorker.write(data, __dirname + "/files/projects.txt");

  // fs.writeFile(
  //   __dirname + "/files/projects.json",
  //   JSON.stringify(projects),
  //   err => {
  //     if (err) {
  //       console.error("Err", err);
  //       return;
  //     }
  //     console.log("written");
  //     fs.readFile(__dirname + "/files/projects.txt", (err, data) => {
  //       if (err) {
  //         console.log("Err on reading", err);
  //         return;
  //       }
  //       console.log(JSON.parse(data.toString()));
  //     });
  //   }
  // );

  // GithubApi.getTopProjects(projects, 3).then(res => {
  //   console.log(`Your Query: ${query}`);
  //   console.log(res);
  // });
}

App();
