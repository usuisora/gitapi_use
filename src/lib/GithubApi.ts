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

export async function getProjectsRate(names: string[]) {
  console.log("getting Rate...");
  return await Promise.all(
    names.map(async name => {
      const stars = await getStars(name);
      return await { name, stars };
    })
  );
}

export async function getSortedProjects(
  names: string[],
  comparison: string = "stars"
) {
  const rated = await getProjectsRate(names);
  return rated.sort((a, b) => b[comparison] - a[comparison]);
}

export async function getTopProjects(names, count: number = 1) {
  const sorted = await getSortedProjects(names, "stars");
  return sorted.slice(0, count);
}
