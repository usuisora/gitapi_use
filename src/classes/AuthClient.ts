import Client from "./Client";
export default class AuthClient extends Client {
  access_token: string;
  constructor(access_token: string) {
    super();
    this.access_token = access_token;
  }
  request = (url: string) => {
    return super.request(url + "&access_token=" + this.access_token);
  };
  getHeader = (url, header) => {
    return super.getHeader(url + "&access_token=" + this.access_token, header);
  };
}
