<script setup lang="ts">
import type { Slide } from '~/types/api'

defineProps<{
  slide: Slide
}>()

const emit = defineEmits(['deleted'])

const apiStore = useApiStore()
const isDialogOpen = ref(false)

function copyUrl(url: string) {
  navigator.clipboard.writeText(url)
}

async function deleteSlide(id: number) {
  await apiStore.deleteSlide(id)
  isDialogOpen.value = false
  emit('deleted')
}
</script>

<template>
  <v-card style="width: 300px" class="mr-3 mb-3">
    <video class="card-video" :src="slide.url" />
    <v-card-title>{{ slide.name }}</v-card-title>
    <v-card-subtitle>创建于 {{ new Date(slide.createdTime).toLocaleString() }}</v-card-subtitle>
    <v-card-actions>
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-content-copy" @click="copyUrl(slide.url)">
        复制播放链接
      </v-btn>
      <v-btn prepend-icon="mdi-pencil">
        编辑
      </v-btn>
      <v-dialog v-model="isDialogOpen" width="auto">
        <template #activator="{ props }">
          <v-btn color="red" v-bind="props" prepend-icon="mdi-delete">
            删除
          </v-btn>
        </template>
        <v-card :title="`确认要删除 ${slide.name} 吗`">
          <v-card-actions>
            <v-btn color="red" prepend-icon="mdi-delete" @click="deleteSlide(slide.id)">
              删除
            </v-btn>
            <v-btn @click="isDialogOpen = false">
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.card-video {
  height: 160px;
  width: 100%;
  margin: 0;
  object-fit: cover;
}
</style>
