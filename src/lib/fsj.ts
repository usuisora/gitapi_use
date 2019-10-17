import * as fs from "async-file";

export const readJSON = async path => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer.toString());
};

export const writeJSON = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data));
};
