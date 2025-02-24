<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';
import { CompanyFilter } from '@/Types/Company';
const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const companiesStore = useCompaniesStore();
const { companies, pagination } = storeToRefs(companiesStore);

const userStore = useUsersStore();
const { users } = storeToRefs(userStore);

const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Company Name', value: 'company' },
  { text: 'Role', value: 'roles' },
  { text: 'Created At', value: 'created_at' },
]);

const filters = ref<CompanyFilter>({
  name: '',
  user_id: '',
});

function onSubmit() {
  companiesStore.fetchCompanies(filters.value);
}

async function onReset() {
  filters.value = {
    name: '',
    user_id: '',
  };
  await companiesStore.fetchCompanies(filters.value);
}

const setInitialStates = async () => {
  await userStore.getUsersByCompanyId();
  //   await companiesStore.fetchCompanies(filters.value);
};

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Users List</h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/create-company-users')"
        >Create User</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit" :auto-focus="false">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        label="Name"
        name="name"
        placeholder="Search by name"
        v-model="filters.name"
      />
      <x-select
        label="Role"
        name="role"
        v-model="filters.user_id"
        placeholder="Select role"
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
    :items="users || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/job-details/${id}`" color="primary">{{ id }}</x-link>
    </template>
    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
    <template #item-users="{ users }">
      <span>{{ users[0].name }}</span>
    </template>
    <template #item-company="{ company }">
      <span>{{ company?.name }}</span>
    </template>
    <template #item-roles="{ roles }">
      <span v-for="role in roles" :key="role.name" class="capitalize">{{
        role.name
      }}</span>
    </template>
  </DataTable>
  <Pagination :links="pagination" />
</template>
