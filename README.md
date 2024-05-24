# nuxt-strapi-zone-utils

Nuxt module with utility components that automatically render dynamic content from your Strapi instance.

> [!IMPORTANT]
> The APIs provided in this module are unstable. Use with caution as breaking changes occur frequently

## Installation

Install the module using your favourite package manager
```
npm i nuxt-strapi-zone-utils
```

`@nuxtjs/strapi` is installed as a dependency to automatically fetch dynamic zone data. Make sure to [configure the url to your strapi instance](https://strapi.nuxtjs.org/setup) through an `.env` file or `nuxt.config.ts`.

```bash
# .env.development
STRAPI_URL=http://localhost:1337
```


## Usage

The `DynamicZone` component renders a dynamic zone. It fetches zone data from your strapi instance, maps zone components to their vue counterparts and passes the appropriate props.

```html
<DynamicZone :contentType="contact" :field="content" />
```

By default all components prefixed `Blocks` are concidered for rendering. The prefix can be changed by setting with the `prefix` option in the module config to a pascal case name prefix.

```ts
export default defineNuxtConfig({
  ...
  strapiZoneUtils: {
    prefix: 'MyPrefix'
  },
  ...
})
```

Props are passed directly to your block components, so it's props needs to match exactly to the names of the corresponding Strapi component fields.

```html
<!-- BlocksGenericCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
```

Components in a dynamic zone are rendered without a wrapper element. So the rendered components can be arranged with for example grid or flexbox by applying styles to a container element.

```html
<div class="space-y-10">
  <DynamicZone :contentType="contact" :field="content" />
</div>
```

> [!NOTE]
> Only single types are supported by the `DynamicZone` component. The lower level `BlockRenderer` component can be used to render any dynamic zone, but you need to fetch the zone data yourself.
