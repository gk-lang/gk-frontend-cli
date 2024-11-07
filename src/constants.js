import { platform } from "node:os";
import pc from "picocolors";
import gradientString from "gradient-string";

export const WIN_PLATFORM = platform() === "win32";
// export const REGISTER = {
//   npm: "https://registry.npmjs.org/",
//   taobao: "https://registry.npmmirror.com/",
// };

export { name, version, publishConfig } from "../package.json";

export const templates = {
  template1: {
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git", // 模板下载地址
    description: "vue-cli输出方案基础版", // 模板描述
    branch: "main", // 分支
  },
  template2: {
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git",
    description: "vite基础版",
    branch: "main",
  },
};
export const gradientBanner = gradientString([
  { color: "#42d392", pos: 0 },
  { color: "#42d392", pos: 0.1 },
  { color: "#647eff", pos: 1 },
])("Hello!\u0020欢迎使用jzt-cli脚手架");
