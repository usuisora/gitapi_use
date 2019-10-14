"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function write(data, path) {
    fs.writeFile(path, JSON.stringify(data), err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.write = write;
function read(path) {
    fs.readFile(path, (data, err) => {
        if (err) {
            console.log(err);
            return;
        }
        return JSON.parse(data.toString());
    });
}
exports.read = read;
function isEmptyFile(path) {
    return Boolean(JSON.stringify(read(path)).length);
}
exports.isEmptyFile = isEmptyFile;
