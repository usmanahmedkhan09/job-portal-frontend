<template>
  <div class="public-layout">
    <header class="public-layout-header">
      <nav class="public-layout-nav">
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
    <main class="public-layout-main">
      <router-view />
    </main>
    <footer class="public-layout-footer">
      <p>&copy; 2023 Job Portal</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLoggedOut = ref(true);
</script>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.public-layout-header {
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.public-layout-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
}

.public-layout-nav ul li {
  margin-left: 20px;
}

.public-layout-nav ul li a {
  color: #333;
  text-decoration: none;
}

.public-layout-main {
  flex: 1;
  padding: 20px;
}

.public-layout-footer {
  background-color: #f9f9f9;
  padding: 10px;
  text-align: center;
  color: #333;
}
</style>
