import * as fsj from "./fsj";

test("Check write json ", async done => {
  const path = "./some.json";
  const item = {
    name: "Squidword"
  };
  await fsj.writeJSON(path, item);
  const res = await fsj.readJSON(path);
  expect(res).toEqual(item);
  // await fsj.delete(path);
  done();
});
