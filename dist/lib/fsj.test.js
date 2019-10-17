"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fsj = __importStar(require("./fsj"));
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
