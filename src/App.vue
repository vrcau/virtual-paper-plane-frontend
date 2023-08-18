<script setup lang="ts">
import { useTheme } from 'vuetify'

useHead({
  title: 'Virtual Paper Plane',
  meta: [
    { name: 'description', content: 'Virtual Paper Plane' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const theme = useTheme()

theme.global.name.value = isDark ? 'dark' : 'light'

watch(isDark, (value) => {
  theme.global.name.value = value ? 'dark' : 'light'
})
</script>

<template>
  <RouterView />
</template>
