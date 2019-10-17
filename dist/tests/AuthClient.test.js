"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthClient_1 = __importDefault(require("../classes/AuthClient"));
test("auth client req", done => {
    const client = new AuthClient_1.default(process.env.ACCESS_TOKEN);
    client
        .request("https://api.github.com/search/repositories?q=version1")
        .then(res => {
        expect(res.items.length).toBeGreaterThan(0);
        done();
    });
});
