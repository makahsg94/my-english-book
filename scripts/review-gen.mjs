import { register } from 'node:module'

register(new URL('./ts-loader.mjs', import.meta.url))

await import('./review-gen.ts')