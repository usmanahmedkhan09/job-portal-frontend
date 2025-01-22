<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';

const jobCategoriesStore = useJobCategoriesStore();
const { jobCategories } = storeToRefs(jobCategoriesStore);

const { hasPermission } = can();

const permissionsEnum: any = useStorage('permissionsEnum', []).value;

const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Skills', value: 'skills' },
  { text: 'Created At', value: 'created_at' },
]);

type Filters = {
  name: string;
  skill: string;
};

const filters = ref<Filters>({
  name: '',
  skill: '',
});

function onSubmit() {
  jobCategoriesStore.fetchJobCategories(filters.value);
}

function onReset() {
  filters.value = {
    name: '',
    skill: '',
  };
}
onMounted(async () => {
  await jobCategoriesStore.fetchJobCategories(filters.value);
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Job Categories List</h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/add-job-category')"
        >Create Category</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit" :auto-focus="false">
    <div class="grid grid-cols-2 gap-4">
      <x-input label="Name" name="name" v-model="filters.name" />
      <x-input label="Skill" name="name" v-model="filters.skill" />
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
    :items="jobCategories || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/job-category-details/${id}`" color="primary">{{
        id
      }}</x-link>
    </template>

    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
  </DataTable>
</template>
