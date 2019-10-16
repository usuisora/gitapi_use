import fetch from "node-fetch";
import fetchTimeout from 'fetch-timeout'
const accessToken: string = "443f16c7a154d84d0fd06a6e7a494ef7a74f4d13";
const url: string = "https://api.github.com/search/";

// function sortProjectsByStars(query) {}
export function getPath(
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

function 

fetchTimeout('https://api.github.com/', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}, 5000, 'My custom timeout error string')
  .then(function (res) {
    if (res.status !== 200) {
      throw new Error('Status code not OK', res.status);
    } else {
      return res.json();
    }
  })
  .then(function (json) {
    console.log("json returned from response");
  })
  .catch(function (err) {
    console.log("error", err);
  });