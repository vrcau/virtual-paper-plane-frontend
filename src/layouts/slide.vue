<script setup lang="ts">
const apiStore = useApiStore()
</script>

<template>
  <v-layout full-height>
    <v-app-bar title="Virtual Paper Plane">
      <NavBar />
    </v-app-bar>
    <v-navigation-drawer>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-upload" title="上传幻灯片" to="/slide/upload" />
        <v-list-item prepend-icon="mdi-image-multiple" title="已上传的幻灯片" to="/slide/list" />
        <v-list-item prepend-icon="mdi-image-filter-drama" title="共享幻灯片" to="/slide/public" />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView v-if="apiStore.user !== null" />
      <div v-else class="d-flex justify-center align-center h-100 flex-column">
        <h2 class="text-h2">
          要求验证
        </h2>
        <v-btn class="mt-4" to="/login" size="x-large" prepend-icon="mdi-login">
          登录
        </v-btn>
      </div>
    </v-main>
  </v-layout>
</template>
