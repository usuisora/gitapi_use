import AuthClient from "../classes/AuthClient";

test("auth client req", done => {
  const client = new AuthClient(process.env.ACCESS_TOKEN);
  client
    .request("https://api.github.com/search/repositories?q=version1")
    .then(res => {
      expect(res.items.length).toBeGreaterThan(0);
      done();
    });
});
