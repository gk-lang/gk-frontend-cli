import { cac } from "cac";
import pc from "picocolors";
import figlet from "figlet";
import { create } from "./template";
import { isExistsFile } from "./create-dir";
import { templates, version, gradientBanner } from "./constants";
import { inputProjectName, chooseDownloadOrigin } from "./prompt";
import { hasTemplate, clg, log, checkPureOptions } from "./utils";

const cli = cac("jzt");
cli
  .command("create", "创建一个新项目")// 增加创建指令
  .allowUnknownOptions() 
  .option("-f, --force", "如果目标文件存在，则强制覆盖") // 强制覆盖
  .option("-g, --github", "使用github模板地址") // 指定项目下载地址是从github下载
  .action(async (cmd) => {
    const projectName = await inputProjectName();
    const isExists = await isExistsFile(projectName, cmd);
    if (isExists) return;
    const isDownloadForGithub = await chooseDownloadOrigin();
    create(projectName, undefined, isDownloadForGithub);
  });

cli
  .command("init <template-name> <project-name>", "创建一个新项目")
  .option("-f, --force", "如果目标文件存在，则强制覆盖")
  .option("-g, --github", "使用github模板地址")
  .action(async (templateName, projectName, cmd) => {
    if (!hasTemplate(templateName)) return;
    const isExists = await isExistsFile(projectName, cmd);
    if (isExists) return;
    create(projectName, templateName);
  });

cli.command("list", "查看所有模板类型").action(() => {
  Object.keys(templates).forEach((key) => {
    clg(`${key} ${templates[key].description}`);
  });
});

// cli.command("version", "查看当前版本").action(() => {
//   clg(version);
// });

cli.help();
cli.version(version);
// cli.on("command:*", () => {
//   log.err(`无效的命令: ${cli.args.join(" ")}`);
//   cli.outputHelp();
//   process.exit(1);
// });


cli.parse();
function printHelp() {
  clg("使用方法:");
  clg("  jzt <command> [options]");
  clg("");
  clg("可用选项:");
  clg("  -v, --version                        查看当前版本");
  clg("  -h, --help                           查看帮助信息");
  clg("");
  clg("可用命令:");
  clg("  create [options] <app-name>          创建一个新项目");
  clg("  init [options] <template> <app-name> 使用模板创建一个新项目");
  clg("  list                                 查看所有模板类型");
  clg("  version                              查看当前版本");
  clg("  help                                 查看帮助信息");
  clg("");
  clg("使用示例:");
  clg("  jzt create -f my-project");
  clg("  jzt init vue3 my-project");
  clg();
  process.exit(1);
}

// cli.outputHelp();
// clg(
//   figlet.textSync("jzt", {
//     font: "3D-ASCII",
//     horizontalLayout: "default",
//     verticalLayout: "default",
//     width: 80,
//     showHardBlanks: true,
//     whitespaceBreak: false
//   })
// );
// clg(gradientBanner);
// clg();
// printHelp();
// clg(`运行 ${pc.cyan("jzt <command> --help")} 查看有关命令的详细用法.`);
