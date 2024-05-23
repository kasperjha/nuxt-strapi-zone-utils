import type { HookComponent } from './types'

/**
 * Generates component map file contents.
 * @param relevantComponents Components to include in component map.
 * @param prefix Component prefix for included components.
 * @returns string of map file contents.
 */
export default function generateFileContents(relevantComponents: HookComponent[], prefix: string) {
  const importNames = relevantComponents
    .map(c => c.pascalName)
    .join(', ')
  const blockName = (c: HookComponent) => `${prefix.toLowerCase()}.${c.kebabName.slice(prefix.length + 1)}`
  const buildMapRows = () => relevantComponents.map(c => `['${blockName(c)}', ${c.pascalName}]`).join(',\n  ') + ',\n'
  const mapRows = (relevantComponents.length !== 0) ? buildMapRows() : ''
  return ''
    + 'import { type Component } from \'@nuxt/schema\'\n'
    + 'import { ' + importNames + ' } from \'#components\'\n\n'
    + 'export default new Map<string, Component>([\n  '
    + mapRows
    + '])\n'
}
