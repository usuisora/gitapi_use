import fetch from "node-fetch";
import { dirs } from "./types";
import { getAllProjects, getRatedProjects, getStars } from "./lib/GithubApi";

let q = "NOT class AND type+language:ts";

console.log(getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]));
// getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]).map(response =>
//   response.then(body =>
//      console.log(body))
// );
// function rely() {
// getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]).then(res =>
//   res.forEach(prom => prom.then(r => console.log(r)))
// );
// // }
// rely();
// getStars("microsoft/TypeScript").then(res => console.log(res));

// let GithubApi = "https://api.github.com/search/";
// let token = "daf6ad231ba6903840667d355eebca078554ff89";
// let headers: object = {
//   Authorization: token
// };

//
