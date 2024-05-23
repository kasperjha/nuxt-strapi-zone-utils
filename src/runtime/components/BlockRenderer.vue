<template>
  <div v-for="block in zoneData" :key="block.id">
    <component :is="componentMap.get(block.__component)" v-if="componentMap.has(block.__component)" v-bind="block" />

    <DebugCard v-else style="margin-top: 20px;">
      No component with name:
      <span class="font-mono">{{ block.__component }}</span>
    </DebugCard>

    <DebugCard v-if="debug" style="margin-top: 20px;">
      DynamicZone debug data:
      <span>{{ block }}</span>
    </DebugCard>
  </div>
</template>

<script setup lang="ts">
import DebugCard from '../DebugCard.vue'
import componentMap from '#build/strapiZonesComponentMap'

type ZoneData = {
  id: number
  __component: string
}[]

defineProps<{
  zoneData: ZoneData
  debug?: boolean
}>()
</script>
