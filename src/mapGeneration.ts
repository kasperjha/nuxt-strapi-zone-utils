import { writeFile } from 'node:fs'
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

/**
 * Recreated type from the `components:extend` nuxt hook.
 */
interface HookComponent {
  pascalName: string
  kebabName: string
}

/**
 * Generates component map file contents.
 * @param relevantComponents Components to include in component map.
 * @param prefix Component prefix for included components.
 * @returns string of map file contents.
 */
function generateFileContents(relevantComponents: HookComponent[], prefix: string) {
  const importNames = relevantComponents
    .map(c => c.pascalName)
    .join(', ')
  const blockName = (c: HookComponent) => `${prefix.toLowerCase()}.${c.kebabName.slice(prefix.length + 1)}`
  const buildMapRows = () => relevantComponents.map(c => `['${blockName(c)}', ${c.pascalName}]`).join(',\n  ') + ',\n'
  const mapRows = (relevantComponents.length !== 0) ? buildMapRows() : ''
  return ''
    + 'import { type Component } from "@nuxt/schema"\n'
    + 'import { ' + importNames + ' } from "#components"\n\n'
    + 'export default new Map<string, Component>([\n'
    + mapRows
    + '])\n'
}

/**
 * Generates an import map file which associates block names to vue components.
 * Only generates entries for components that match the specified prefix.
 * Assumes block names on form `base.card-list` and components in PascalCase.
 *
 * @param components Components to include in component map.
 * @param prefix Common prefix string for block names and vue components.
 */
export default function generateComponentMap(components: HookComponent[], prefix: string) {
  const relevantComponents = components
    .filter(c => c.pascalName.startsWith(prefix))
  const fileContents = generateFileContents(relevantComponents, prefix)
  const targetPath = resolver.resolve('runtime/generated/componentMap.ts')
  const handleWriteError = (err: Error) => {
    if (err !== null) {
      console.log(err)
      throw err
    }
  }
  writeFile(targetPath, fileContents, handleWriteError)
}
