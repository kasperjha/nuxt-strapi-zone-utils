<template>
  <BlockRenderer v-if="data !== null" :zone-data="data" :debug="debug" />
  <DebugCard v-if="data === null || debug">
    DynamicZone:
    <p>error: {{ error }}</p>
    <p>data: {{ data }}</p>
  </DebugCard>
</template>

<script setup lang="ts">
import DebugCard from '../DebugCard.vue'
import BlockRenderer from './BlockRenderer.vue'
import { useStrapi, ref, computed } from '#imports'

const props = defineProps<{
  field: string
  contentType: string
  debug?: boolean
}>()

const strapi = useStrapi()
const getPageData = () => strapi.findOne(props.contentType, {
  populate: {
    [props.field]: {
      populate: '*',
    },
  },
})

const rawData = ref<null | object>(null)
const error = ref<null | object>(null)
const data = computed(() => rawData.value !== null ? rawData.value.data.attributes[props.field] : null)

getPageData()
  .then((d) => {
    rawData.value = d
  })
  .catch((e: Error) => {
    console.error('Error rendering dynamic zone:', e)
    error.value = e
  })
</script>
