import fetch from "node-fetch";
import { dirs } from "./types";
let gitApi = "https://api.github.com/search/";
let token = "daf6ad231ba6903840667d355eebca078554ff89";
let headers: object = {
  Authorization: token
};

async function queryApiByDir(where: dirs, query: string, filter) {
  let url: string = `${gitApi}${where}?${query}`;
  let fetchData: any = await fetch(url, {
    method: "GET",
    headers
  });
  let jsonData: any = await fetchData.json();
  let filteredData = [];
  if (jsonData.items.length)
    jsonData.items.map(async p => await filteredData.push(p[filter]));

  return {
    filteredData,
    total_count: jsonData.total_count
  };
}

function queryRepos(query: string, filter = "full_name") {
  return queryApiByDir("repositories", query, filter);
}
async function queryCodeInRepo(
  query: string,
  repo: string,
  filter = "html_url"
) {
  return queryApiByDir("code", `${query}+repo:${repo}`, filter);
}
// queryRepos("q=typescript&sort=stars").then(res =>
//    console.log(res)
//    );
queryCodeInRepo("q= NOT class AND type", "microsoft/vscode").then(res =>
  console.log(res.total_count)
);
