import { resolve } from 'path'
import type { Plugin } from 'vite'
import type { Paths } from './type'

const clear_reg = /\/\*/

async function parse() {
  const cwd = process.cwd()
  const tsconfig_path = resolve(cwd, './tsconfig.json')
  const import_res = await import(tsconfig_path)
  const paths: Paths = import_res.default?.compilerOptions?.paths || { "@/*": ["./src/*"] }
  const parse_res = {}
  for(const key of Object.keys(paths)) {
    const newkey = key.replace(clear_reg, "")
    parse_res[newkey] = resolve(cwd, paths[key][0].replace(clear_reg, ""))
  }
  return parse_res
}



export default function tspaths2alias():Plugin {
  return {
    name: 'tspahts2alias',
    async config() {
      const parse_res = await parse()
      console.log('log:>>', parse_res)
      return {
        resolve: {
          alias: parse_res
        }
      }
    }
  }
}