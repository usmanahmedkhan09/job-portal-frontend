<script setup lang="ts">
defineProps({
  job: Object,
});
</script>

<template>
  <div class="p-4 border-b">
    <div class="flex justify-between items-center">
      <div class="flex flex-col items-start">
        <h2 class="text-lg">{{ job?.title }}</h2>
        <span class="text-gray-600 text-red-700" v-if="job?.count">
          {{ job?.count }} new
          <span v-if="job?.location" class="text-gray-600">
            in <span class="capitalize">{{ job?.location }}</span>
          </span>
        </span>
      </div>
      <button class="text-gray-500 hover:text-gray-700">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
