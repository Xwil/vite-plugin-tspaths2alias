# vite-pluig-tspathsalias

This plugin is create alias map for vite config, will use project root `tsconfig.json` file `compilerOptions.paths` value

## Install

```bash
npm install -D vite-plugin-tspaths2alias
```

## Usage

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tspaths2alias from 'vite-plugin-tspaths2alias'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),tspaths2alias()]
})
```

## Notice

If `tsconfig.json` no `compilerOptions.paths`, default have `{"@/*": ["./src/*"]}`