"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("async-file"));
exports.readJSON = async (path) => {
    const buffer = await fs.readFile(path);
    return JSON.parse(buffer.toString());
};
exports.writeJSON = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data));
};
