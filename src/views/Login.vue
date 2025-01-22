<!-- job-portal-frontend/src/views/Login.vue -->
<template>
  <div class="login-container">
    <h2 class="text-xl font-semibold">Login</h2>
    <x-form @submit="handleLogin" :auto-focus="false">
      <div class="grid grid-cols-1 gap-4">
        <x-input label="Email" name="email" v-model="email" />
        <x-input
          label="Password"
          name="password"
          type="password"
          v-model="password"
        />
      </div>
      <div class="flex gap-4 justify-end">
        <x-button class="w-full" color="primary" size="md" @click="handleLogin"
          >Login</x-button
        >
      </div>
    </x-form>
  </div>
</template>

<script setup lang="ts">
const usersStore = useUsersStore();
const email = ref('usman@gmail.com');
const password = ref('password123');

const handleLogin = async () => {
  await usersStore.handleLogin(email.value, password.value);
};

onMounted(() => {
  usersStore.getCsrfToken();
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
}
</style>
