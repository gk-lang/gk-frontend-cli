import boxen from "boxen";
import pc from "picocolors";
import semver from "semver";
import { log,clg } from "./log.js";
import axios from "axios";
import fse from 'fs-extra';
import ora from 'ora'
import trash from 'trash'
import { isOverwriteDir } from '../prompt'
import { WIN_PLATFORM } from "../constants.js";
import * as fs from "node:fs";
import * as path from "node:path";
import * as packageJson from "../../../package.json";

/**
 * 计算文件夹大小
 * @param dirPath 文件夹路径
 * @param callback 回调函数
 * @returns
 */
export function getPackageSize(dirPath, callback) {
  let totalSize = 0;

  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(directory, file.name);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    } else if (file.isDirectory()) {
      totalSize += getPackageSize(path.join(directory, file.name), () => {});
    }
  });

  callback(totalSize);
}

/**
 * 根据win平台判断是否显示emoji
 * @param emoji emoji表情
 * @returns
 */
export const isShowEmoji = (emoji) => {
  return WIN_PLATFORM ? "" : emoji;
};

/**
 * 获取cli工具的默认注册源
 * @returns
 */
export const getDefaultRegister = () => {
  return packageJson.publishConfig.registry;
};

/**
 * 获取cli工具的包信息
 * @param npmName 当前npm包名
 * @param register npm存放的仓库地址
 * @returns
 */
export const getNpmInfo = async (npmName, register = getDefaultRegister()) => {
  const npmUrl = register + npmName;
  log.info(`正在获取${npmUrl}包信息...`);
  let res;
  try {
    res = await axios.get(npmUrl);
  } catch (err) {
    log.warning(`未发现${npmName}包，请检查是否发布到${register}`);
    process.exit(1);
  }
  return res;
};

/**
 * 获取npm包最新版本号
 * @param npmName 当前npm包名
 * @param register npm存放的仓库地址
 * @returns
 */
export const getNpmLatestVersion = async (
  npmName,
  register = getDefaultRegister()
) => {
  const { data } = await getNpmInfo(npmName, register);
  return data["dist-tags"].latest;
};

/**
 * 判断当前npm包版本是否需要更新
 * @param currentVersion 当前版本号
 * @param npmName 当前npm包名
 */
export const checkNpmVersion = async () => {
  const currentVersion = packageJson.version;
  const npmName = packageJson.name;
  const latestVersion = await getNpmLatestVersion(npmName);
  if (
    semver.lt(latestVersion, currentVersion) ||
    latestVersion === currentVersion
  ) {
    return;
  }
  const dim = pc.dim;
  const magenta = pc.magenta;
  // https://github.com/gk-lang/gk-frontend-cli.git
  return boxen(
    `${isShowEmoji("🎉")} ${pc.yellow("哇~有更新!")} ${pc.red(
      currentVersion
    )} → ${pc.green(latestVersion)}\n${isShowEmoji("📄")} ${
      magenta("更新日志: ") +
      dim(`https://github.com/gk-lang/gk-frontend-cli/releases/${npmName}`)
    }\n${isShowEmoji("🚀")} ${
      dim("运行") +
      magenta(` npm i -g ${npmName}@latest --force`) +
      dim("升级到最新版脚手架")
    }`,
    { padding: 1, margin: 1, borderColor: "cyan", borderStyle: "round" }
  );
};

/**
 * 检查执行命令是否存在无效的选项
 * @param cli
 */
export function checkPureOptions(cli) {
  /** 过滤出执行命令的所有选项 */
  const argvOptions = process.argv.filter((argv) => argv.startsWith("-"));

  /** 有效的选项 */
  const availableOptions = [
    "-f",
    "-g",
    "-v",
    "-h",
    "--force",
    "--github",
    "--version",
    "--help",
  ];

  /** 无效的选项 */
  const invalidOptions = argvOptions.find(
    (argv) => !availableOptions.includes(argv)
  );

  if (!invalidOptions) return;
  log.err(`无效的选项: ${invalidOptions}`);
  cli.outputHelp();
  process.exit(1);
}

export const isExistsFile = async (projectName, options) => {
  
  // 获取当前工作目录
  const cwd = process.cwd()
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName)
  // 判断目录是否存在
  if (fse.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 将之前的同名项目移到本地回收站中
      await trash([targetDirectory])
      return false
    } else {
      const isOverwrite = await isOverwriteDir()
      // 选择 Cancel
      if (!isOverwrite) {
        clg(pc.green('取消成功'))
        return true
      } else {
        const spinner = ora()
        // 选择 Overwirte ，先删除掉原有重名目录
        try {
          spinner.start('删除中...')
          await trash([targetDirectory])
          spinner.succeed(`${pc.green('成功删除')} ${pc.gray(projectName)}`)
        } catch (error) {
          spinner.fail(`${pc.red('覆盖失败, 请手动删除重名目录')}`)
          process.exit(1)
        }
        return false
      }
    }
  } else {
    return false
  }
}
