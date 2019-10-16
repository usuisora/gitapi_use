"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubApi_1 = require("./GithubApi");
test("get all projects full_names", async (done) => {
    jest.setTimeout(60000);
    GithubApi_1.getAllProjects("typescript+language:ts").then(res => {
        expect(res.length).toBeGreaterThan(1);
        done();
    });
});
test("get stars of microsoft/typescript project", async (done) => {
    jest.setTimeout(60000);
    GithubApi_1.getStars("microsoft/typescript").then(stars => {
        console.log(stars);
        expect(stars).toBeGreaterThan(2);
        done();
    });
});
test("get stars of not existed project", async (done) => {
    jest.setTimeout(60000);
    GithubApi_1.getStars("microsoft/notexist699600404").then(stars => {
        console.log(stars);
        expect(stars).toEqual(0);
        done();
    });
});
test("get list of rated projects", async (done) => {
    jest.setTimeout(60000);
    GithubApi_1.getProjectsRate(["microsoft/TypeScript", "typeorm/typeorm"]).then(res => {
        expect(res.length).toEqual(2);
    });
});
test("get list of  unexisted rated projects", async (done) => {
    jest.setTimeout(60000);
    GithubApi_1.getProjectsRate(["microsoft/TypeScript23", "typeorm/typeorm3"]).then(res => {
        expect(res.length).toEqual(2);
    });
});
