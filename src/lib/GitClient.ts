import fetch from "node-fetch";
const accessToken: string = "f8f4d45d996c1a8a77bacb02ce8b7b9626a9d19b";
const url: string = "https://api.github.com/search/";

// function sortProjectsByStars(query) {}
function getPath(
  dir: string,
  q: string,
  page: number,
  token: string = accessToken
): string {
  return `${url}${dir}?q=${q}&page=${page}&access_token=${token}`;
}

export async function getBody(dir: string, q: string, page: number) {
  const query = getPath(dir, q, page);
  const response = await fetch(query);
  const body = await response.json();
  return body;
}
