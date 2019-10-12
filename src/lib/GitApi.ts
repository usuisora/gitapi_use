import * as GitClient from "./GitClient";
async function getProjectsRecursive(q: string, page: number, result) {
  const body = await GitClient.getBody("code", q, page);
  if (body.items == undefined) return result;
  body.items.map(item => result.push(item.repository.full_name));
  return getProjectsRecursive(q, page + 1, result);
}

export async function getAllProjects(q: string) {
  console.log("wait please analizing...");
  return await getProjectsRecursive(q, 1, []);
}

// async function getTop3Project(full_names){
//   let ratingProjects = []

// }
