# nuxt-strapi-zone-utils

Utility components for rendering strapi dynamic zones in a nuxt application.

> [!WARNING]
> This package is in development and does not have a stable API. Do not rely on backwards compatability as breaking changes may occur frequently. PRs and issues are welcome.

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
