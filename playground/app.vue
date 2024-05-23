<template>
  <BlockRenderer :zone-data="zoneData" />
</template>

<script setup lang="ts">
const zoneData = [
  {
    __component: 'blocks.component-a',
    id: 1,
    world: 'world',
  },
]
</script>
