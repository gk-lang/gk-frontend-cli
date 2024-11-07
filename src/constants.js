import { platform } from 'node:os'
import pc from "picocolors";
import gradientString from 'gradient-string'

export const WIN_PLATFORM = platform() === 'win32'
export const REGISTER = {
  npm: 'https://registry.npmjs.org/',
  taobao: 'https://registry.npmmirror.com/'
}

export { name, version } from '../package.json'

export const templates = {
  template1: {
    downloadUrl: 'https://gitee.com/yiming_chang/vue-pure-admin.git', // 模板下载地址
    description: 'vue-pure-admin完整版本', // 模板描述
    branch: 'main' // 分支
  },
  template2: {
    downloadUrl: 'https://gitee.com/yiming_chang/pure-admin-thin.git',
    description: 'vue-pure-admin非国际化精简版本',
    branch: 'main'
  }
}
export const gradientBanner = gradientString([
  { color: "#42d392", pos: 0 },
  { color: "#42d392", pos: 0.1 },
  { color: "#647eff", pos: 1 },
])('Hello!\u0020欢迎使用jzt-cli脚手架');
