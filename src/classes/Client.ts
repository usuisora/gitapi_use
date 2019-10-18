import fetch from "node-fetch";

export default class Client {
  async request(url: string) {
    let res = await fetch(url);
    return await res.json();
  }
  async getHeader(url: string, header: string) {
    const response = await fetch(url);
    const hds = await response.headers;
    return await hds.get(header);
  }
}
