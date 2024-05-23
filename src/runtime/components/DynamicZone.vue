<template>
  <BlockRenderer v-if="data !== null" :zone-data="data" :debug="debug" />
  <DebugCard v-if="data === null || debug">
    DynamicPage debug data:
    <p>error: {{ error }}</p>
    <p>data: {{ data }}</p>
  </DebugCard>
</template>

<script setup lang="ts">
import DebugCard from '../DebugCard.vue'
import BlockRenderer from './BlockRenderer.vue'

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
    console.log(d)
  })
  .catch((e) => {
    console.log(e)
    error.value = e
  })
</script>
