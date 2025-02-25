<script setup lang="ts">
import { JobCategory } from '@/Types/Job';
import User from '@/Types/User';

const jobCategoryStore = useJobCategoriesStore();
const { jobCategory } = storeToRefs(jobCategoryStore);

const route = useRoute();

const { is_required } = useRules();

const JobCategoryForm = ref<JobCategory>(new JobCategory());

const isEdit = computed(() => !!route.params.id);

const setInitialStates = async () => {
  if (isEdit.value) {
    JobCategoryForm.value = (await jobCategoryStore.getJobCategoryById(
      route.params.id as string
    )) as JobCategory;
    new User();
  }
};

async function createUser(isValid: any): Promise<void> {
  if (!isValid) return;
  if (isEdit.value)
    await jobCategoryStore.updateJobCategory(
      route.params.id as string,
      JobCategoryForm.value
    );
  else await jobCategoryStore.createJobCategory(JobCategoryForm.value);
}

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} Category
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/user-list')"
        >Category List</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="createUser">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        label="Name"
        name="name"
        v-model="JobCategoryForm.name"
        :rules="[is_required]"
      />
      <x-input
        label="Name"
        name="name"
        v-model="JobCategoryForm.skill"
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
