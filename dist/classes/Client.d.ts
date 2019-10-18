export default class Client {
    request(url: string): Promise<any>;
    getHeader(url: string, header: string): Promise<any>;
}
