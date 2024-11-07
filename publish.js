import inquirer from "inquirer";
import { platform } from "node:os";
import pc from "picocolors";
import { spawn } from "node:child_process";

import simpleGit from "simple-git";

const gitOptions = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

const log = (content) => console.log(pc.green(content));
const logError = (content) => console.log(pc.red(content));

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

const spawnProcess = async (...args) => {
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

const command = async (name) => {
  const git = simpleGit(gitOptions);
  const currentBranch = (await git.branch()).current;
  const npm = platform() === "win32" ? "npm.cmd" : "npm";
  try {
    // 切换版本号，例如：npm version patch
    await spawnProcess(npm, ["version", name], { cwd: getCwd() });
    // 构建项目, 例如：npm run build
    await spawnProcess(npm, ["run", "build"], {
      cwd: getCwd(),
    });
    // 发布项目, 例如：npm publish
    await spawnProcess(npm, ["publish"], { cwd: getCwd() });
    // npm publish 推送成功
    log(` 🎊 Congratulations on the successful release`);
    // 把版本更新的代码推送到远程仓库
    spawnProcess("git", ["push", "origin", currentBranch], { cwd: getCwd() });
    process.exit();
  } catch (error) {
    logError(" 🚫 Failed to publish");
    process.exit();
  }
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
