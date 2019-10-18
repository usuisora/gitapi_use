import fetch from "node-fetch";

export default class Client {
  async request(url: string) {
    let response = await fetch(url);
    let body = await response.json();
    if (response.status == 401) {
      throw Error("BED TOKEN\n");
    }
    return body;
  }
  async getHeader(url: string, header: string) {
    const response = await fetch(url);
    const hds = await response.headers;
    return await hds.get(header);
  }
}
