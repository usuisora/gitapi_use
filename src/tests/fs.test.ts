import * as fs from "async-file";

test("Check fs.writetextFile", async done => {
  await fs.writeFile("./cWF.txt", "hey");
  const hey = await fs.readTextFile("./cWF.txt");
  await fs.delete("./cWF.txt");
  expect(hey).toBe("hey");
  done();
});

test("Check write json ", async done => {
  const path = "./some.json";
  const item = {
    name: "Squidword"
  };
  await fs.writeFile(path, JSON.stringify(item));
  const buffer: Buffer = await fs.readFile(path);
  const data = JSON.parse(buffer.toString());
  expect(data).toEqual(item);
  await fs.delete(path);
  done();
});

test("add data to json ", async done => {
  const path = "./sp.json";
  const name = {
    name: "Butters"
  };
  let names = [
    {
      name: "Eric"
    },
    {
      name: "Kyle"
    }
  ];
  await fs.writeFile(path, JSON.stringify(names));
  let buffer = await fs.readFile(path);
  names: [] = JSON.parse(buffer.toString());
  names.push(name);
  await fs.delete(path);
  expect(names.length).toBe(3);
  done();
});

test("read unexisted file ", async done => {
  try {
    const data = await fs.readFile("./nofile.txt");
  } catch (err) {
    expect(await fs.exists("./nofile.txt")).toBeFalsy();
    done();
  }
});
