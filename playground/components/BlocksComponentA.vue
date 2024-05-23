<template>
  <h1>Hello, {{ world }}!</h1>
</template>

<script setup lang="ts">
defineProps<{
  world: string
}>()
</script>
