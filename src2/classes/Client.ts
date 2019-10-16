type ClientType {
    url: string;
    token: string;
    request: (query:string)=>()
}
class Client extend ClientType{
    constructor(){

    }
}