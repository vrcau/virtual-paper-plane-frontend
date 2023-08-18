<script setup lang="ts">
const rules = {
  required: (value: string) => !!value || '必填项',
}

const apiStore = useApiStore()

const username = ref('')
const password = ref('')

async function login() {
  if (username.value === '' && password.value === '')
    return
  await apiStore.login(username.value, password.value)
}
</script>

<template>
  <div class="pa-10">
    <h5 class="text-h5" variant="flat">
      第三方登录
    </h5>
    <div class="my-3">
      <v-btn prepend-icon="mdi-github" href="https://github.com/login/oauth/authorize?client_id=Iv1.c253691eadd40d1e">
        使用 Github 登录
      </v-btn>
    </div>
    <h5 class="text-h5">
      账号密码登录
    </h5>
    <v-text-field v-model="username" label="用户名" variant="underlined" clearable :rules="[rules.required]" />
    <v-text-field
      v-model="password" label="密码" variant="underlined" type="password" clearable
      :rules="[rules.required]"
    />
    <v-btn prepend-icon="mdi-login" size="large" @click="login">
      登录
    </v-btn>
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>
