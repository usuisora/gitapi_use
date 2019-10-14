import fetch from "node-fetch";
const accessToken: string = "fe86467605bcdf4c5dc2b07e584cf91b05f5cc14";
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

export async function getBody(dir: string, q: string, page: number = 1) {
  const query = getPath(dir, q, page);
  const response = await fetch(query);
  const body = await response.json();
  return body;
}

export async function getSearchRate() {
  const response = await fetch(
    "https://api.github.com/rate_limit?access_token=fe86467605bcdf4c5dc2b07e584cf91b05f5cc14"
  );
  const body = await response.json();
  return body.resources.search;
}
