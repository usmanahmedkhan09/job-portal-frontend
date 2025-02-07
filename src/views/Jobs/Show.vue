<script lang="ts" setup>
import { Job } from '@/Types/Job';
import { useRoute } from 'vue-router';

const jobsStore = useJobsStore();
const { job } = storeToRefs(jobsStore);

const route = useRoute();

const setInitialStates = async () => {
  (await jobsStore.getJobById(route.params.id as string)) as Job;
};

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Job Details</h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/job-list')"
        >Jobs List</x-button
      >
      <x-button
        color="orange"
        size="md"
        @click="$router.push(`/update-job/${job?.id}`)"
        >Edit Job</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <div class="p-4 rounded shadow mb-6 bg-white">
    <dl class="grid md:grid-cols-2 gap-x-6 gap-y-4">
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Posted By</dt>
        <dd>{{ job?.user?.name ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Title</dt>
        <dd>{{ job?.title ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Category</dt>
        <dd>
          <x-tag color="success" size="xs">{{ job?.category?.name }}</x-tag>
        </dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Skills</dt>
        <dd>
          <x-tag
            class="mx-1"
            color="success"
            size="xs"
            v-for="job in job?.skills"
            :key="job.id"
            >{{ job.name }}</x-tag
          >
        </dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Job Type</dt>
        <dd>{{ job?.job_type ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Salary Range</dt>
        <dd>{{ job?.salary_range ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Status</dt>
        <dd>{{ job?.status ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Created At</dt>
        <dd>{{ job?.created_at ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Location</dt>
        <dd>{{ job?.location ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Job Requirements</dt>
        <dd>
          <div v-html="job?.requirements"></div>
        </dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Description</dt>
        <dd>{{ job?.description ?? 'N/A' }}</dd>
      </div>
    </dl>
  </div>
</template>
