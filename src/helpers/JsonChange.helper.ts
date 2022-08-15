import { writeFile, readFileSync } from "fs";

export const fileWriter = (path: string, obj: any) => {
  writeFile(path, JSON.stringify(obj), (err) => {
    if (err) throw err;
  });
};

export const fileReader = (path: string) => {
  const ReadData = readFileSync(path, "utf8");
  return JSON.parse(ReadData);
};
