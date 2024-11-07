import inquirer from "inquirer";
import { platform } from "node:os";
import pc from "picocolors";
import minimist from "minimist";
import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
const args = minimist(process.argv.slice(2));

import simpleGit from "simple-git";

const gitOptions = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

const log = (content) => console.log(pc.green(content));

const message = `
  🚀 Please select a version to publish: 
    ------------------------------
    | Small  | npm version patch |
    ------------------------------
    | Medium | npm version minor |
    ------------------------------
    |  Big   | npm version major |
    ------------------------------
`;

const getCwd = () => process.cwd();
/**
 * 计算文件夹大小
 * @param dirPath 文件夹路径
 * @param callback 回调函数
 * @returns
 */
const getPackageSize = (dirPath, callback) => {
  let totalSize = 0;

  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(dirPath, file.name);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    } else if (file.isDirectory()) {
      totalSize += getPackageSize(path.join(dirPath, file.name), () => {});
    }
  });

  callback(totalSize);
};
const spawnProcess = async (...args) => {
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

const command = async (name) => {
  const git = simpleGit(gitOptions);
  const currentBranch = (await git.branch()).current;
  const npm = platform() === "win32" ? "npm.cmd" : "npm";
  // 切换版本号，例如：npm version patch
  await spawnProcess(npm, ["version", name], { cwd: getCwd() });
  // 构建项目, 例如：npm run build
  await spawnProcess(npm, ["run", args._[0] ? args._[0] : "build"], {
    cwd: getCwd(),
  });
  // 发布项目, 例如：npm publish
  await spawnProcess(npm, ["publish"], { cwd: getCwd() });
  getPackageSize("./dist", (size) => {
    log(
      ` 🎊 Congratulations on the successful release, 🕋 Total Package Size: ${size}`
    );
    spawnProcess("git", ["push", "origin", currentBranch], { cwd: getCwd() });
    process.exit();
  });
};

log(message);
inquirer
  .prompt({
    type: "list",
    message: "请选择推送版本",
    default: "Small",
    name: "Version",
    choices: ["Small", "Medium", "Big", "Exit"],
  })
  .then(async ({ Version }) => {
    switch (Version) {
      case "Small":
        await command("patch");
      case "Medium":
        await command("minor");
      case "Big":
        await command("major");
      case "Exit":
        process.exit();
    }
  });
