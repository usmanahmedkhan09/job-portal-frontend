<script setup lang="ts">
import { Job, JobCategory, JobStatus, JobType } from '@/Types/Job';

const jobsStore = useJobsStore();
const { job } = storeToRefs(jobsStore);

const skillsStore = useSkillsStore();
const { skills } = storeToRefs(skillsStore);

const jobCategoryStore = useJobCategoriesStore();
const { jobCategories } = storeToRefs(jobCategoryStore);

const jobCategoriesOptions = computed(() => {
  return jobCategories.value.map((item: JobCategory) => ({
    label: item.name,
    value: item.id,
  }));
});

const route = useRoute();

const { is_required, is_email } = useRules();

const jobForm = ref<Job>(new Job());

const jobPostedBy = useStorage('user', new User()).value.name;

const isEdit = computed(() => !!route.params.id);

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

const setInitialStates = async () => {
  await jobCategoryStore.fetchJobCategories();
  if (isEdit.value) {
    jobForm.value =
      (await jobsStore.getJobById(route.params.id as string)) || new Job();
    await getCategorySkills();
    jobForm.value.skills = jobForm.value.skills.map((item: any) => item.id);
  }

  jobForm.value.user_id = useStorage(
    'user',
    new User()
  ).value?.id?.toString() as string;
};

async function createJob(isValid: any): Promise<void> {
  jobForm.value = Job.cleanObject(jobForm.value) as Job;
  if (!isValid) return;
  if (isEdit.value)
    await jobsStore.updateJob(route.params.id as string, jobForm.value);
  else await jobsStore.createJob(jobForm.value);
}

async function getCategorySkills() {
  await skillsStore.getSkillsByCategoryId(jobForm.value.category_id);
}

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} Job
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/jobs-list')"
        >Jobs List</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="createJob">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        label="Job Posted By"
        name="title"
        v-model="jobPostedBy"
        disabled
      />
      <x-input
        label="Title"
        name="title"
        v-model="jobForm.title"
        :rules="[is_required]"
      />
      <x-input
        label="Salary Range"
        name="salary range"
        v-model="jobForm.salary_range"
        :rules="[is_required]"
      />
      <x-input
        label="Location"
        name="location"
        v-model="jobForm.location"
        :rules="[is_required]"
      />
      <x-select
        label="Job Type"
        name="job type"
        v-model="jobForm.job_type"
        :rules="[is_required]"
        :options="jobTypesOptions"
      />
      <x-select
        label="Status"
        name="status"
        v-model="jobForm.status"
        :rules="[is_required]"
        :options="jobStatusOptions"
      />
      <x-select
        label="Job Category"
        name="job category"
        v-model="jobForm.category_id"
        :rules="[is_required]"
        :options="jobCategoriesOptions"
        @update:modelValue="getCategorySkills"
      />
      <x-select
        label="Skills"
        name="skills"
        v-model="jobForm.skills"
        :rules="[is_required]"
        :options="computedSkills"
        multiple
      />

      <x-textarea
        label="Description"
        name="description"
        v-model="jobForm.description"
        :rules="[is_required]"
      />
      <x-textarea
        label="Requirements"
        name="requirements"
        v-model="jobForm.requirements"
        :rules="[is_required]"
      />
    </div>
    <div class="flex w-full justify-end">
      <x-button type="submit" color="success">{{
        isEdit ? 'Update' : 'Create'
      }}</x-button>
    </div>
  </x-form>
</template>
