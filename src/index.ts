import fetch from "node-fetch";
import { dirs } from "./types";
import { getAllProjects, getStars } from "./lib/GitApi";

let q = "NOT class AND type+language:ts";
getStars("microsoft/typescript").then(stars => console.log(stars));
// getAllProjects(q).then(res => console.log(res));

// let gitApi = "https://api.github.com/search/";
// let token = "daf6ad231ba6903840667d355eebca078554ff89";
// let headers: object = {
//   Authorization: token
// };

// async function queryApiByDir(where: dirs, query: string, filter) {
//   let url: string = `${gitApi}${where}?${query}`;
//   let fetchData: any = await fetch(url, {
//     method: "GET",
//     headers
//   });
//   let jsonData: any = await fetchData.json();
//   let filteredData = [];
//   if (jsonData.items)
//     jsonData.items.map(async p => await filteredData.push(p[filter]));

//   return {
//     filteredData,
//     total_count: jsonData.total_count
//   };
// }

// function queryRepos(query: string, filter = "full_name") {
//   return queryApiByDir("repositories", query, filter);
// }
// async function queryCodeInRepo(
//   query: string,
//   repo: string,
//   filter = "html_url"
// ) {
//   return queryApiByDir("code", `${query}+repo:${repo}`, filter);
// }
// queryRepos("q= type +language:ts&sort=stars").then(res =>
//   res.filteredData.forEach(name_repo => {
//     queryCodeInRepo("q= NOT class AND type", name_repo).then(i =>
//       console.log(i.total_count + "files with condition ")
//     );
//   })
// );
