import Client from "./Client";
export default class AuthClient extends Client {
    access_token: string;
    constructor(access_token: string);
    request: (url: string) => any;
}
