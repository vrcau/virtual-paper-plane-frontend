<script setup lang="ts">
const apiStore = useApiStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await apiStore.loginWithGithub(route.query.code as string)
  router.push('/slide/list')
})
</script>

<template>
  <h1>Github</h1>
</template>

<route lang="yaml">
meta:
  layout: login
</route>
