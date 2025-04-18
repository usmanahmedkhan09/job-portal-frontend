<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';
import { JobCategory, JobStatus } from '@/Types/Job';
const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const jobsStore = useJobsStore();
const { jobs, pagination } = storeToRefs(jobsStore);

const jobCategoriesStore = useJobCategoriesStore();
const { jobCategories } = storeToRefs(jobCategoriesStore);

const skillsStore = useSkillsStore();
const { skills } = storeToRefs(skillsStore);

const jobCategoriesOptions = computed(() => {
  return jobCategories.value.map((item: JobCategory) => ({
    label: item.name,
    value: item.id,
  }));
});

const computedSkills = computed(() => {
  return skills.value.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
});

const jobTypesOptions = computed(() => {
  return Object.entries(JobType).map(([_, type]) => ({
    label: type.split('-').join(' ').toUpperCase(),
    value: type,
  }));
});

const jobStatusOptions = computed(() => {
  return Object.entries(JobStatus).map(([_, status]) => ({
    label: status.toUpperCase(),
    value: status,
  }));
});

async function getCategorySkills() {
  await skillsStore.getSkillsByCategoryId(filters.value.category_id);
}

const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Title', value: 'title' },
  { text: 'Employer Name', value: 'user' },
  { text: 'Salary Range', value: 'salary_range' },
  { text: 'Job Type', value: 'job_type' },
  { text: 'Status', value: 'status' },
  { text: 'Created At', value: 'created_at' },
]);

const filters = ref({
  title: '',
  category_id: '',
  skills: [],
  job_type: '',
  status: '',
  page: 1,
});

function onSubmit() {
  jobsStore.getJobs(filters.value as any);
}

async function onReset() {
  filters.value = {
    title: '',
    category_id: '',
    skills: [],
    job_type: '',
    status: '',
    page: 1,
  };
  await jobsStore.getJobs();
}

const setInitialStates = async () => {
  await jobsStore.getJobs();
  await jobCategoriesStore.fetchJobCategories();
};

onMounted(() => {
  setInitialStates();
});

const nextPage = (page: any) => {
  filters.value.page = page;
  jobsStore.getJobs(filters.value as any);
};
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Jobs List</h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/create-job')"
        >Create Jobs</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit" :auto-focus="false">
    <div class="grid grid-cols-3 gap-4">
      <x-input
        label="Title"
        name="name"
        placeholder="Search by title"
        v-model="filters.title"
      />
      <x-select
        label="Job Category"
        name="job category"
        v-model="filters.category_id"
        :options="jobCategoriesOptions"
        @update:modelValue="getCategorySkills"
        filterable
        placeholder="Select Job Category"
      />
      <x-select
        label="Skills"
        name="skills"
        v-model="filters.skills"
        :options="computedSkills"
        multiple
        placeholder="Select Skills"
      />
      <x-select
        label="Job Type"
        name="job type"
        v-model="filters.job_type"
        :options="jobTypesOptions"
        placeholder="Select Job Type"
      />
      <x-select
        label="Status"
        name="status"
        v-model="filters.status"
        :options="jobStatusOptions"
        placeholder="Select Status"
      />
    </div>
    <div class="flex gap-4 justify-end">
      <x-button color="#ff5e00" size="md" type="submit">Search</x-button>
      <x-button color="primary" size="md" @click.prevent="onReset"
        >Reset</x-button
      >
    </div>
  </x-form>
  <DataTable
    class="customize-table rounded-lg"
    table-class-name="rounded-lg"
    :headers="tableHeaders"
    :items="jobs || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/job-details/${id}`" color="primary">{{ id }}</x-link>
    </template>
    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
    <template #item-user="{ user }">
      <span>{{ user.name }}</span>
    </template>
  </DataTable>
  <Pagination :links="pagination" @page-changed="(page) => nextPage(page)" />
</template>
