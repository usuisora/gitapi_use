import * as GithubClient from "./GithubClient";
async function getProjectsRecursive(q: string, page: number, result) {
  const body = await GithubClient.getBody("code", q, page);
  if (body.items == undefined) return result;
  body.items.map(item => result.push(item.repository.full_name));
  return getProjectsRecursive(q, page + 1, result);
}

export async function getAllProjects(q: string) {
  console.log("wait please analizing...");
  return await getProjectsRecursive(q, 1, []);
}
// https://api.github.com/search/repositories?q=repo:microsoft/typescript
export async function getStars(project: string) {
  const q = `repo:${project}`;
  const body = await GithubClient.getBody("repositories", `repo:${project}`);
  return body.errors == undefined ? body.items[0].stargazers_count : 0;
}

export function getRatedProjects(names) {
  console.log("getting Rate...");
  return names.map(async name => {
    const stars = await getStars(name);
    return await { name, stars };
  });
}

// export async function getSortedProjects(names, filter: string) {
//   return await getRatedProjects(names).sort((a, b) => a[filter] > b[filter]);
// }

// export async function getTopProjects(names) {
//   const arr = await getSortedProjects(names, "stars");
//   return arr.slice(0, 3);
// }
