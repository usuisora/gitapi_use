import { getAllProjects, getStars, getRatedProjects } from "./GithubApi";

// test("get all projects full_names", async done => {
//   jest.setTimeout(60000);
//   getAllProjects("typescript+language:ts").then(res => {
//     expect(res.length).toBeGreaterThan(1);
//     done();
//   });
// });

// test("get stars of microsoft/typescript project", async done => {
//   jest.setTimeout(60000);
//   getStars("microsoft/typescript").then(stars => {
//     console.log(stars);
//     expect(stars).toBeGreaterThan(2);
//     done();
//   });
// });

// test("get stars of not existed project", async done => {
//   jest.setTimeout(60000);
//   getStars("microsoft/notexist699600404").then(stars => {
//     console.log(stars);
//     expect(stars).toEqual(0);
//     done();
//   });
// });

test("get list of rated projects", async done => {
  jest.setTimeout(60000);
  getRatedProjects(["microsoft/TypeScript", "typeorm/typeorm"]).map(
    async response => {
      const body = await response;
      expect(body.stars).not.toEqual(0);
      done();
    }
  );
});
test("get list of  unexisted rated projects", async done => {
  jest.setTimeout(60000);
  getRatedProjects(["microsoft/TypeScript23", "typeorm/typeorm3"]).map(
    async response => {
      const body = await response;
      expect(body.stars).toEqual(0);
      done();
    }
  );
});
