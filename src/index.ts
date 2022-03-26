import { resolve } from 'path'
import type { Plugin } from 'vite'
import type { Paths } from './type'

const clear_reg = /\/\*/

async function parse(configPath:string) {

  const cwd = process.cwd()
  const tsconfig_path = resolve(cwd, configPath)
  const import_res = await import(tsconfig_path)
  const paths: Paths = import_res.default?.compilerOptions?.paths
  if(!paths || !Object.keys(paths)) return;

  const parse_res = {}
  for(const key of Object.keys(paths)) {
    const newkey = key.replace(clear_reg, "")
    parse_res[newkey] = resolve(cwd, paths[key][0].replace(clear_reg, ""))
  }
  return parse_res
}

interface Option{
  tsConfigPath?:string,
  log?:boolean;
}

export default function tspaths2alias(opt?:Option):Plugin {

  const {tsConfigPath = './tsconfig.json', log = false} = opt || {};

  return {
    name: 'tspahts2alias',
    async config(userConfig) {
      const parse_res = await parse(tsConfigPath);

      return {
        resolve: {
          alias: {
            ...userConfig?.resolve?.alias ,
            ...parse_res,
          },
        },
      };
    },
    configResolved(resolvedConfig){
      log && console.log(resolvedConfig.resolve.alias)
    }
  };
}
