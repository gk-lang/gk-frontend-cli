import path from 'node:path'
import fs from 'fs-extra'
import pc from 'picocolors'
import { clg } from '../utils'
import ora from 'ora'
import { isOverwriteDir } from '../prompt'
import trash from 'trash'
const spinner = ora()

export const isExistsFile = async (projectName, options) => {
  // 获取当前工作目录
  const cwd = process.cwd()
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName)
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
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
