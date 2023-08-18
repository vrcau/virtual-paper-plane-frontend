<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="d-flex align-center flex-column h-100 justify-center">
    <v-icon class="text-h1 mb-2">
      mdi-file-question-outline
    </v-icon>
    <h2 class="text-h2">
      {{ t('not-found') }}
    </h2>
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>
