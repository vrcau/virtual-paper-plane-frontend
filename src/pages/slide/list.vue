<script setup lang="ts">
import type { Slide } from '~/types/api'

const apiStore = useApiStore()
const slides: Ref<Slide[]> = ref([])

onMounted(async () => {
  updateSlides()
})

async function updateSlides() {
  slides.value = await apiStore.getSlides()
}
</script>

<template>
  <div class="px-8 pt-8">
    <h3 class="text-h3 mb-4">
      已上传的幻灯片
    </h3>
    <div class="d-flex flex-wrap">
      <slide-item v-for="slide in slides" :key="slide.id" :slide="slide" @deleted="updateSlides" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: slide
</route>
