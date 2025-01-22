<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';
import Role from '@/Types/Role';

const rolesStore = useRolesStore();
const { roles } = storeToRefs(rolesStore);

const permissionsStore = usePermissionsStore();
const { permissions } = storeToRefs(permissionsStore);

const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Permissions', value: 'permissions' },
  { text: 'Created At', value: 'created_at' },
]);

interface User {
  email: string;
  name: string;
}

const filters = ref<Role>({
  name: null,
  permissions: [],
});

function onSubmit() {
  rolesStore.fetchRoles(filters.value.name);
}

function onReset() {
  filters.value = {
    permissions: [],
    name: '',
  };
}

onMounted(async () => {
  await rolesStore.fetchRoles();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Roles List</h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/create-role')"
        >Create Role</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit" :auto-focus="false">
    <div class="grid grid-cols-1 gap-4">
      <x-input label="Name" name="name" v-model="filters.name" />
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
    :items="roles || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/role-details/${id}`" color="primary">{{ id }}</x-link>
    </template>
    <template #item-email="{ email }">
      <x-link color="primary">{{ email }}</x-link>
    </template>
    <template #item-permissions="{ permissions }">
      <div class="flex gap-2">
        <span v-for="permission in permissions" :key="permission.id">
          {{ permission.name }}
        </span>
      </div>
    </template>
    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
  </DataTable>
</template>
