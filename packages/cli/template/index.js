import { chooseTemplate } from "../prompt";
import { clone, checkNpmVersion, clg } from "../utils";
import { templates } from "../constants";

export const create = async (projectName, templateName) => {
  const run = async (key) => {
    let name = key;
    if (["1", "2"].includes(key + "")) {
      name = `template${key}`;
    }
    // console.log("name", name);
    const { downloadUrl, branch } = templates[name];

    // 并行执行 - 下载模板和检查脚手架版本
    Promise.all([
      clone(downloadUrl, projectName, ["-b", `${branch}`]),
      checkNpmVersion(),
    ]).then((res) => {
      res[1] && clg(res[1]);
    });
  };
  if (templateName) {
    run(templateName);
  } else {
    const template = await chooseTemplate();
    run(template);
  }
};
