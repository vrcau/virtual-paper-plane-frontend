<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const apiStore = useApiStore()
const router = useRouter()
const isDragEntered = ref(false)
const showLoadingDialog = ref(false)
const fileInput: Ref<HTMLInputElement | null> = ref(null)

async function uploadSlides(files: FileList) {
  for (let index = 0; index < files.length; index++) {
    const file = files.item(index) as File
    if (!(file.name.toLocaleLowerCase().endsWith('.jpg') || file.name.toLocaleLowerCase().endsWith('.webp') || file.name.toLocaleLowerCase().endsWith('.png')))
      return
  }

  showLoadingDialog.value = true
  await apiStore.uploadSlide(files)
  router.push('/slide/list')
}

function openFileDialog() {
  fileInput.value?.click()
  if (fileInput.value?.files?.length !== 0)
    uploadSlides(fileInput.value?.files as FileList)
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragEntered.value = false

  if (event.dataTransfer?.files.length !== 0) {
    const files = event.dataTransfer?.files as FileList
    uploadSlides(files)
  }
}

function handleDropEvents(event: MouseEvent) {
  event.preventDefault()

  if (event.type === 'dragover')
    isDragEntered.value = true

  else
    isDragEntered.value = false
}
</script>

<template>
  <v-dialog v-model="showLoadingDialog" :scrim="false" persistent width="400" height="100">
    <v-card color="primary">
      <v-card-text>
        上传中
        <v-progress-linear indeterminate class="mb-2" />
      </v-card-text>
    </v-card>
  </v-dialog>
  <div
    class="upload-container" :class="isDragEntered ? 'upload-drag' : ''" @drop="handleDrop"
    @dragenter="handleDropEvents" @dragover="handleDropEvents" @dragleave="handleDropEvents"
  >
    <div class="upload-form">
      <h3 class="text-h3 mb-3">
        {{ isDragEntered ? "快松手啦" : "上传你的幻灯片" }}
      </h3>
      <p class="text-body-1 text-gray">
        {{ isDragEntered ? "松开鼠标按键以上传" : "将文件拖入该窗口或点击按钮打开文件选择器" }}
      </p>
      <p class="text-body-1 text-gray">
        支持上传多个总大小小于 20MB 的 .jpg .png .webp 格式文件
      </p>
      <input ref="fileInput" type="file" style="display: none;" multiple accept=".webp,.jpg,.png">
      <v-btn variant="tonal" prepend-icon="mdi-file" class="mt-4" @click="openFileDialog">
        选择文件
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.upload-form {
  text-align: center;
}

.upload-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.upload-drag {
  border: 5px dashed white;
}
</style>

<route lang="yaml">
meta:
  layout: slide
</route>
