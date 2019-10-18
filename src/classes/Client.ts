import fetch from "fetch";

export default class Client {
  async request(url: string) {
    let res = await fetch(url);
    return await res.json();
  }
}
