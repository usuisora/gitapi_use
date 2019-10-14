import * as fs from "fs";

export function write(data, path) {
  fs.writeFile(path, JSON.stringify(data), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

export function read(path) {
  fs.readFile(path, (data, err) => {
    if (err) {
      console.log(err);
      return;
    }
    return JSON.parse(data.toString());
  });
}

export function isEmptyFile(path): boolean {
  return Boolean(JSON.stringify(read(path)).length);
}
