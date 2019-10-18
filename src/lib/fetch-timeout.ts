import fetch from "node-fetch";

export default (url, delay) => {
  const req = fetch(url);
  const timeout = new Promise((resolve, reject) => {
    return setTimeout(() => reject(new Error("request timeout")), delay);
  });
  return Promise.race([req, timeout]).then(response => response.json());
};
