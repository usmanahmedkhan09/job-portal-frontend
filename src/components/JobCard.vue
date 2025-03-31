<script setup lang="ts">

defineProps({
  title: String || undefined,
  company: String,
  rating: Number,
  location: String,
  salary: String,
  jobType: String,
  jobDetails: String,
  description: String,
  activeDays: Number,
});
</script>
<template>
  <div
    class="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 md:min-w-[450px] mb-5 max-w-[450px]"
  >
    <span
      class="text-sm font-semibold bg-pink-100 text-pink-700 px-2 py-1 rounded"
    >
      Hiring multiple candidates
    </span>

    <h2 class="text-xl font-bold mt-2 capitalize">{{ title }}</h2>

    <div class="text-gray-600 text-sm mt-1">
      Hashtag Media
      <span class="font-semibold text-black">4.0 ⭐</span>
    </div>

    <div class="text-gray-500 text-sm">{{ location }}</div>

    <div class="mt-3 flex gap-2">
      <span class="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded"
        >From {{ salary }}</span
      >
      <span
        class="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded capitalize"
        >{{ jobType }}</span
      >
    </div>

    <div class="mt-3 flex items-center text-blue-600 font-medium">
      <span class="mr-1">➤</span> Easily apply
    </div>

    <ul class="mt-2 text-gray-700 text-sm list-disc pl-5">
      <li v-html="jobDetails" class="line-clamp-5"></li>
    </ul>

    <p class="text-gray-400 text-xs mt-3">Active {{ activeDays }} days ago</p>
  </div>
</template>
