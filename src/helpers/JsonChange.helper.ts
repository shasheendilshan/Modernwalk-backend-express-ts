import { writeFile } from "fs";

export const fileWriter = (path: string, obj: any) => {
  writeFile(path, JSON.stringify(obj), (err) => {
    if (err) throw err;
  });
};
