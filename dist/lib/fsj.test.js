"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsj = require("./fsj");
test("Check write json ", async (done) => {
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
