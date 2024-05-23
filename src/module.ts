import { defineNuxtModule, addComponentsDir, createResolver } from '@nuxt/kit'
import buildComponentMap from './mapGeneration.js'

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
function moduleSetup(moduleOptions: ConfigOptions, nuxt) {
  addComponentsDir({
    path: resolver.resolve('runtime/components'),
  })
  const componentPrefix = moduleOptions.prefix
  const componentsHook = components => buildComponentMap(components, componentPrefix)
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
