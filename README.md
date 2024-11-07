# join-frontend-cli

## 发包方法：`npm run pub`
> 此方法原理是利用publish.js脚本，动态更新package.json 中的版本号，然后执行npm publish 命令，发布到npm上

注意发包前保证变更代码已经提交到 git


## 调试方法1: `npm run dev`
> 此种方法会实时监听代码的变化，让jzt命令时刻处于最新状态，不需要每次都重新安装

- 1.npm run dev
- 2.新开一个命令行窗口，运行jzt 命令即可

注意：如果遇到 Remove the existing file and try again 报错，去删除对应的执行文件即可


## 调试方法2: `npm link --force`
- 1.npm run build
- 2.npm link --force
- 3.运行jzt 命令即可

注意：如果遇到 Remove the existing file and try again 报错，去删除对应的执行文件即可
