"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubApi_1 = require("./lib/GithubApi");
let q = "NOT class AND type+language:ts";
console.log(GithubApi_1.getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]));
// function rely() {
//   console.log(
//     await getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"])
//   );
// }
// rely();
// getAllProjects(q).then(res => console.log(res));
// let GithubApi = "https://api.github.com/search/";
// let token = "daf6ad231ba6903840667d355eebca078554ff89";
// let headers: object = {
//   Authorization: token
// };
//
