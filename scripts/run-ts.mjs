import { register } from 'node:module'

register(new URL('./ts-loader.mjs', import.meta.url))

const target = process.argv[2]
if (!target) {
  console.error('usage: node scripts/run-ts.mjs <script-name-without-ts>')
  process.exit(1)
}

await import(`./${target}.ts`)