import { defineNuxtModule, addComponentsDir, createResolver, addTemplate, updateTemplates } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { HookComponent } from './types.js'
import generateComponentMap from './mapGeneration.js'

const resolver = createResolver(import.meta.url)

/**
 * Configuration options for the module.
 */
interface ConfigOptions {
  prefix: string
}

/**
 * Module setup function adds components for auto import
 * and registers a hook that rebuilds the component map.
 * @param moduleOptions Module options from nuxt config.
 */
function moduleSetup(moduleOptions: ConfigOptions, nuxt: Nuxt) {
  addComponentsDir({
    path: resolver.resolve('runtime/components'),
  })

  const componentPrefix = moduleOptions.prefix
  const componentList: HookComponent[] = []

  addTemplate({
    filename: 'strapiZonesComponentMap.ts',
    getContents: () => generateComponentMap(componentList, componentPrefix),
  })

  const componentsHook = (components: HookComponent[]) => {
    const relevantComponents = components.filter(c => c.pascalName.startsWith(componentPrefix))
    componentList.push(...relevantComponents)
    console.log('updated component list')
    updateTemplates()
  }

  nuxt.hook('components:extend', componentsHook)
}

/**
 * Define module.
 */
export default defineNuxtModule<ConfigOptions>({
  meta: {
    name: '@kasperjha/strapi-utils',
    configKey: 'strapiZoneUtils',
  },
  defaults: {
    prefix: 'Blocks',
  },
  setup: moduleSetup,
})
