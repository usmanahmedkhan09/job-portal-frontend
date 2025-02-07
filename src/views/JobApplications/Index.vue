<script setup lang="ts">
import Pagination from '@/Components/Pagination.vue';
import { TableHeader } from '@/Types/CommonTypes';
import { JobCategory, JobStatus } from '@/Types/Job';
const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const jobsApplicationsStore = useJobsApplicationsStore();
const { jobsApplications, pagination } = storeToRefs(jobsApplicationsStore);

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
});

function onSubmit() {
  jobsApplicationsStore.fetchJobsApplication(filters.value as any);
}

async function onReset() {
  filters.value = {
    title: '',
    category_id: '',
    skills: [],
    job_type: '',
    status: '',
  };
  await jobsApplicationsStore.fetchJobsApplication();
}

const setInitialStates = async () => {
  await jobsApplicationsStore.fetchJobsApplication();
  await jobCategoriesStore.fetchJobCategories();
};

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Jobs Applications List</h2>
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
        label="Job Application Status"
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
    :items="jobsApplications || []"
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
  <Pagination :links="pagination" />
</template>
