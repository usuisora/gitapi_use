"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("async-file");
exports.readJSON = async (path) => {
    const buffer = await fs.readFile(path);
    return JSON.parse(buffer.toString());
};
exports.writeJSON = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data));
};
