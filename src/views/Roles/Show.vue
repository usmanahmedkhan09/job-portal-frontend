<script setup lang="ts">
import Role from '@/Types/Role';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const rolesStore = useRolesStore();

const formatted = (date) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');

const role = ref<Role>({
  name: null,
  created_at: null,
  updated_at: null,
  permissions: [],
});

const setInitialStates = async () => {
  role.value = (await rolesStore.getRoleById(+route.params.id)) as Role;
};

onMounted(() => {
  setInitialStates();
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">Role Details</h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/role-list')"
        >Roles List</x-button
      >
      <x-button
        color="orange"
        size="md"
        @click="$router.push(`/update-role/${role?.id}`)"
        >Edit Role</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />

  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <div class="mt-1">
        {{ role.name }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Permissions</label>
      <div class="mt-1">
        <div class="flex gap-2">
          <span v-for="permission in role.permissions" :key="permission.id">
            {{ permission.name }}
          </span>
        </div>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Created At</label>
      <div class="mt-1">
        {{ formatted(role.created_at) }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Updated At</label>
      <div class="mt-1">
        {{ formatted(role.updated_at) }}
      </div>
    </div>
  </div>
</template>
