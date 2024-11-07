import inquirer from 'inquirer'

export const chooseTemplate = async () => {
  const { template } = await inquirer.prompt([
    {
      name: 'template',
      type: 'list',
      message: '请选择模板类型',
      choices: [
        {
          value: 'template1',
          name: '模版1【vue-cli】【element-plus】【输出方案】',
          checked: true
        },
        {
          value: 'template2',
          name: '模版2【vite】【element-plus】'
        }
      ]
    }
  ])
  return template
}

export const inputProjectName = async () => {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      default: 'join-frontend-admin'
    }
  ])
  return projectName
}

export const isOverwriteDir = async () => {
  const { isOverwrite } = await inquirer.prompt([
    // 返回值为promise
    {
      name: 'isOverwrite', // 与返回值对应
      type: 'list', // list 类型
      message: '目标文件已存在, 请选择一个操作',
      choices: [
        { name: '覆盖(会将之前的同名项目移到本地回收站中)', value: true },
        { name: '取消', value: false }
      ]
    }
  ])
  return isOverwrite
}

