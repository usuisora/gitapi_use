"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubApi_1 = require("./GithubApi");
test("getProjects", () => {
    const q = "typesctipt";
    console.log(GithubApi_1.getAllProjects("typescript + language: ts + repo: microsoft / vscode"));
    expect(1 + 1).toBe(2);
});
