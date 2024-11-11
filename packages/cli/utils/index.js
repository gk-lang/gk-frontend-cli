export * from "./log";
export * from "./clone";
export * from "./check";
export * from "./openBrowser";
import { spawn } from "node:child_process";

export const spawnProcess = async (...args) => {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(...args);
    subprocess.stdout.setEncoding("utf8");
    subprocess.stderr.setEncoding("utf8");
    subprocess.stdout.pipe(process.stdout);
    subprocess.stderr.pipe(process.stderr);
    subprocess.on("close", (code) => {
      if (code === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });
};
