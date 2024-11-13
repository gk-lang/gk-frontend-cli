import { platform } from "node:os";
import gradientString from "gradient-string";

export const WIN_PLATFORM = platform() === "win32";

export const templates = {
  template1: {
    key: 1,
    title: "vue-cli输出方案基础版",
    tags: ["vue-cli", "vue3"],
    downloadUrl: "https://gitee.com/zgkaaa/gk-frontend-vuecli-outputconfig.git", // 模板下载地址
    description:
      "集成了输出方案相关组件、用户、登录、权限、路由等等，工程化工具使用的是vue-cli", // 模板描述
    branch: "main", // 分支
    selected: false,
  },
  template2: {
    key: 2,
    title: "vite基础版",
    tags: ["vite", "vue3"],
    downloadUrl: "https://gitee.com/zgkaaa/gk-frontend-vite-base.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是vite",
    branch: "main",
    selected: true,
  },
  template3: {
    key: 3,
    title: "vue-cli基础版",
    tags: ["vue-cli", "vue3"],
    downloadUrl: "https://gitee.com/zgkaaa/gk-frontend-vuecli-base.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是vue-cli",
    branch: "main",
    selected: false,
  },
  template4: {
    key: 4,
    title: "uni-app基础版",
    tags: ["vue3"],
    downloadUrl: "https://gitee.com/zgkaaa/gk-frontend-vuecli-outputconfig.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是uni-app",
    branch: "main",
    selected: false,
  }
};
export const gradientBanner = gradientString([
  { color: "#42d392", pos: 0 },
  { color: "#42d392", pos: 0.1 },
  { color: "#647eff", pos: 1 },
])("Hello!\u0020欢迎使用jzt-cli脚手架");
