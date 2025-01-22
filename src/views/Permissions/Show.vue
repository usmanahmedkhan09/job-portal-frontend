<script setup lang="ts">
import Permission from '@/Types/Permission';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const permissionsStore = usePermissionsStore();

const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const permission = ref<Permission>({
  name: null,
  created_at: null,
  updated_at: null,
});

const setInitialStates = async () => {
  permission.value = (await permissionsStore.getPermissionById(
    +route.params.id
  )) as Permission;
};

onMounted(() => {
  setInitialStates();
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Permission Details</h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/permission-list')"
        >Permissions List</x-button
      >
      <x-button
        color="orange"
        size="md"
        @click="$router.push(`/permission-update/${permission?.id}`)"
        >Edit Permission</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />

  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-2">
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <div class="mt-1">
        {{ permission.name }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Created At</label>
      <div class="mt-1">
        {{ formatted(permission.created_at) }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Updated At</label>
      <div class="mt-1">
        {{ formatted(permission.updated_at) }}
      </div>
    </div>
  </div>
</template>
