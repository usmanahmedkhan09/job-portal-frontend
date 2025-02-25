<template>
  <div class="flex flex-col min-h-screen">
    <header
      id="mainHeader"
      class="flex items-center justify-between bg-white shadow-md p-4"
    >
      <div class="flex items-center gap-3">
        <div class="h-8">
          <img class="h-9" src="../assets/logo.jpg" alt="" />
        </div>
        <nav class="mt-1">
          <ul class="flex items-center space-x-4">
            <li><a href="/home">Home</a></li>
            <li><a href="/register">Company Reviews</a></li>
          </ul>
        </nav>
      </div>

      <nav class="flex">
        <ul class="flex gap-2 items-center">
          <li
            v-if="!isAuthenticated"
            class="flex items-center gap-6 cursor-pointer"
          >
            <div
              class="rounded p-1 hover:bg-primary-200 hover:border hover:border-gray-300"
            >
              <x-icon class="!h-6 !w-6" icon="message"></x-icon>
            </div>
            <div
              class="rounded p-1 hover:bg-primary-200 hover:border hover:border-gray-300"
            >
              <x-icon class="!h-6 !w-6" icon="bell"></x-icon>
            </div>
            <ProfileCard />
          </li>
          <li v-else>
            <a class="font-medium text-primary" color="primary" href="/login"
              >Sign In</a
            >
          </li>
          <x-divider class="h-6 mx-6" vertical />
          <li><a href="/register">Employers / Post Job</a></li>
        </ul>
      </nav>
    </header>
    <main class="mt-8 flex-1">
      <router-view />
    </main>
    <footer id="footer" class="public-layout-footer">
      <p>&copy; 2023 Job Portal</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isAuthenticated = computed(() =>
  useStorage('user', new User()).value.id ? true : false
);
</script>

<style scoped>
.public-layout-footer {
  background-color: #f9f9f9;
  padding: 10px;
  text-align: center;
  color: #333;
}
</style>
