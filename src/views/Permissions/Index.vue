<script setup lang="ts">
import { TableHeader } from '@/Types/CommonTypes';
const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const permissionStore = usePermissionsStore();
const { permissions } = storeToRefs(permissionStore);
const tableHeaders = ref<TableHeader[]>([
  { text: 'Ref-id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Created At', value: 'created_at' },
]);

const filters = ref({
  name: '',
});

function onSubmit() {
  permissionStore.fetchPermissions(filters.value.name);
}

function onReset() {
  filters.value = {
    name: '',
  };
}

onMounted(() => {
  permissionStore.fetchPermissions();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Permissions List</h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/permission-create')"
        >Create Permission</x-button
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
    :items="permissions || []"
    hide-footer
  >
    <template #item-id="{ id }">
      <x-link :to="`/permission-details/${id}`" color="primary">{{
        id
      }}</x-link>
    </template>
    <template #item-created_at="{ created_at }">
      <span>{{ formatted(created_at).value }}</span>
    </template>
  </DataTable>
</template>
