import * as fs from "fs";

export function writeJson(path, data) {
  let d = JSON.stringify(data);
  fs.writeFileSync(path, d);
}

export function readJson(path: string) {
  try {
    let file = fs.readFileSync(path).toString();
    return JSON.parse(file);
  } catch (err) {
    return {};
  }
}

export function BufferToJson(data) {
  return JSON.parse(data.toString());
}
export function isEmptyFile(path): boolean {
  return fs.readFileSync(path).length == 0;
}
