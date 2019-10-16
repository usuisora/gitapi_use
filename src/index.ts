import * as fetch from "./githubApi";
import { file } from "@babel/types";
import * as fs from "fs";
const main = async () => {
  // let projects = await fetch.projects;
  fs.writeFileSync("./projects.json", "ffa");
};

try {
  main();
} catch (err) {
  console.log(err);
}
