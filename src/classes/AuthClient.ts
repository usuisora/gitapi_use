import Client from "./Client";
export default class AuthClient extends Client {
  access_token: string;
  constructor(access_token: string) {
    super();
    this.access_token = access_token;
  }
  request = (url: string, delay = 5000) => {
    return super.request(url + "&access_token=" + this.access_token, delay);
  };
}
