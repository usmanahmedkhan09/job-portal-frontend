<script setup lang="ts">
defineProps({
  job: Object,
});

const { set, get } = useCookies(['search_history']);

type Job = {
  id: string;
  title: string;
  location: string;
  count: number;
};

const removeJob = (jobId: string) => {
  const searchHistory = get('search_history') || [];
  const newSearchHistory = searchHistory.filter((j: Job) => j.id !== jobId);
  set('search_history', newSearchHistory);
};
</script>
<template>
  <div class="p-4 border-b cursor-pointer">
    <div class="flex justify-between items-center">
      <div
        class="flex flex-col items-start"
        @click="$emit('handleSelectedJob', job)"
      >
        <h2 class="text-lg">{{ job?.title }}</h2>
        <span class="text-gray-600 text-red-700" v-if="job?.count">
          {{ job?.count }} new
          <span v-if="job?.location" class="text-gray-600">
            in <span class="capitalize">{{ job?.location }}</span>
          </span>
        </span>
      </div>
      <button
        class="text-gray-500 hover:text-gray-700"
        @click.prevent="removeJob(job?.id)"
      >
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
