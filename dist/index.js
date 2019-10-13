"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubApi_1 = require("./lib/GithubApi");
let q = "NOT class AND type+language:ts";
// console.log(getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]));
GithubApi_1.getTopProjects(["microsoft/TypeScript", "brookshi/Hitchhiker", "typeorm/typeorm"], 2).then(res => console.log("top = ", res));
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
