import { fileURLToPath, pathToFileURL } from 'node:url'
import { existsSync } from 'node:fs'

/**
 * Minimal hooks for running the Vite-style (extensionless) import graph with
 * Node's native TypeScript type stripping:
 *  - resolve: appends `.ts` / `/index.ts` to unresolvable relative specifiers
 *  - load:    polyfills Vite's `import.meta.env` (used by helper `au()` at
 *             module-load time) so content modules evaluate outside Vite.
 */
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (err?.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.')) throw err
    for (const suffix of ['.ts', '/index.ts']) {
      const candidate = new URL(specifier + suffix, context.parentURL)
      if (existsSync(fileURLToPath(candidate))) {
        return nextResolve(pathToFileURL(fileURLToPath(candidate)).href, context)
      }
    }
    throw err
  }
}

export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context)
  if (typeof result?.format === 'string' && result.format.includes('typescript') && result.source) {
    const source = String(result.source)
    if (source.includes('import.meta.env')) {
      return { ...result, source: source.replaceAll('import.meta.env', '({ BASE_URL: \'/\' })') }
    }
  }
  return result
}