<h1 align="left">@jzt/cli</h1>
<p align="left">快速构建九州通前端项目初始化工程的命令行工具</p>

## 发包方法：`npm run pub`
> 此方法原理是利用publish.js脚本，动态更新package.json 中的版本号，然后执行npm publish 命令，发布到npm上

注意发包前保证变更代码已经提交到 git


## 调试方法1: `npm run dev`
> 此种方法会实时监听代码的变化，让jzt命令时刻处于最新状态，不需要每次都重新安装

- 1.npm run dev
- 2.npm link --force (初次运行的时候执行，后面就不需要了)
- 3.新开一个命令行窗口，运行jzt 命令即可

注意：如果遇到 Remove the existing file and try again 报错，去删除对应的执行文件即可


## 调试方法2: `npm link --force`
- 1.npm run build
- 2.npm link --force
- 3.运行jzt 命令即可

注意：如果遇到 Remove the existing file and try again 报错，去删除对应的执行文件即可

## 全局安装
``` bash
npm install -g @jzt/cli
# or
yarn global add @jzt/cli
# or
pnpm add -g @jzt/cli
```

## 全局升级
``` bash
npm update -g @jzt/cli
# or
yarn global upgrade --latest @jzt/cli
# or
pnpm up --latest -g @jzt/cli
```

## 全局卸载
``` bash
npm uninstall -g @jzt/cli
# or
yarn global remove @jzt/cli
# or
pnpm remove -g @jzt/cli
```

## 使用方法
``` bash
# pure init 项目名称 模板类型
pure init myproject template1

# 交互式选择模板并创建项目
pure create

# 当然也可以选择不安装@jzt/cli创建项目，使用npx创建项目
npx @jzt/cli init thin myproject
# or
npx @jzt/cli create
```

## 更多命令
检查版本，也可以用于检查是否成功安装@jzt/cli
``` bash
jzt -v
```

更多帮助信息
``` bash
jzt -h
```