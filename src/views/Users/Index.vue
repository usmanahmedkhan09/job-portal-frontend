<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const { hasPermission } = can();

const permissionsEnum: any = useStorage('permissionsEnum', []).value;

const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Role', value: 'roles' },
  { text: 'Permissions', value: 'permissions', width: 400 },
  { text: 'Created At', value: 'created_at' },
]);

type Filters = {
  email: string;
  name: string;
};

const filters = ref<Filters>({
  email: '',
  name: '',
});

function onSubmit() {
  usersStore.fetchUsers(filters.value);
}

function onReset() {
  filters.value = {
    email: '',
    name: '',
  };
}
onMounted(async () => {
  await usersStore.fetchUsers(filters.value);
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Users List</h2>
    <div class="flex space-x-2 items-center">
      <x-button
        v-if="hasPermission(permissionsEnum.USER_CREATE)"
        color="primary"
        size="md"
        @click="$router.push('/create-user')"
        >Create User</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit" :auto-focus="false">
    <div class="grid grid-cols-2 gap-4">
      <x-input label="Email" name="email" v-model="filters.email" />
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
    :items="users || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/user-details/${id}`" color="primary">{{ id }}</x-link>
    </template>
    <template #item-email="{ email }">
      <x-link color="primary">{{ email }}</x-link>
    </template>
    <template #item-roles="{ roles }">
      <x-tag
        class="mx-1"
        color="success"
        size="xs"
        v-for="role in roles"
        :key="role.id"
        >{{ role.name }}</x-tag
      >
    </template>
    <template #item-permissions="{ permissions }">
      <x-tag
        class="m-1"
        color="success"
        size="xs"
        v-for="permission in permissions"
        :key="permission.name"
        >{{ permission.name }}</x-tag
      >
    </template>
    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
  </DataTable>
</template>
