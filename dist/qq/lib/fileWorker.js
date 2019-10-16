"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function writeJson(path, data) {
    let d = JSON.stringify(data);
    fs.writeFileSync(path, d);
}
exports.writeJson = writeJson;
function readJson(path) {
    try {
        let file = fs.readFileSync(path).toString();
        return JSON.parse(file);
    }
    catch (err) {
        return {};
    }
}
exports.readJson = readJson;
function BufferToJson(data) {
    return JSON.parse(data.toString());
}
exports.BufferToJson = BufferToJson;
function isEmptyFile(path) {
    return fs.readFileSync(path).length == 0;
}
exports.isEmptyFile = isEmptyFile;
