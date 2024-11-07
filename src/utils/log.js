import pc from 'picocolors'
import logSymbols from 'log-symbols'

export const clg = console.log

export const log = {
  err: (msg) => {
    clg(logSymbols.error, pc.red(msg))
  },
  warning: (msg) => {
    clg(logSymbols.warning, pc.yellow(msg))
  },
  info: (msg) => {
    clg(logSymbols.info, pc.bold(msg))
  }
}

export default log
