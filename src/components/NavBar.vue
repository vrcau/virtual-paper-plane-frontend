<script setup lang="ts">
const apiStore = useApiStore()
</script>

<template>
  <div class="nav-bar">
    <v-btn to="/slide/upload">
      幻灯片
    </v-btn>
    <v-btn to="/activity/list">
      活动
    </v-btn>
    <v-divider vertical style="align-self: center; height: 40px; margin: 0 1rem;" />
    <div v-if="apiStore.user !== null" class="d-flex align-center">
      <p>{{ apiStore.user.nickName }}</p>
      <v-btn class="ml-3" prepend-icon="mdi-logout" @click="apiStore.logout">
        登出
      </v-btn>
    </div>
    <v-btn v-else to="/login">
      登录
    </v-btn>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  margin: 0 1rem;
}

.nav-bar a {
  margin: 0 0.5rem;
}
</style>
