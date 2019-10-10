import fetch from "node-fetch";

fetch("https://api.github.com/search/repositories?q=language:ts")
  .then(json => json.json())
  .then(res => console.log(res));
