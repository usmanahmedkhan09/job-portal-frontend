<script setup lang="ts">
import { Job } from '@/Types/Job';

const props = defineProps({
  focus: {
    type: Boolean,
    default: false,
  },
});

const jobStore = useJobsStore();
const { fetchJobs } = jobStore;
watch(
  () => props.focus,
  (value) => {
    if (value) {
      const input = document.querySelector('input');
      input?.focus();
    }
  }
);

const filters = ref<Pick<Job, 'location' | 'title'>>({
  title: '',
  location: '',
});

const submitHandler = async () => {
  await fetchJobs(filters.value);
};
</script>
<template>
  <x-form
    class="flex justify-between items-center gap-2"
    @submit="submitHandler"
  >
    <x-input
      icon-left="search"
      type="text"
      placeholder="Job title, keywords or company..."
      size="lg"
      class="w-full mb-0!"
      v-model="filters.title"
    />
    <x-divider class="h-6" vertical />
    <x-input
      icon-left="location"
      type="text"
      placeholder='City, state or zip code, or "remote"...'
      size="lg"
      class="w-full mb-0!"
      v-model="filters.location"
    />
    <x-button type="submit" class="px-8" color="primary" size="lg"
      >Find jobs</x-button
    >
  </x-form>
</template>
