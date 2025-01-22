<script lang="ts" setup>
const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);
import User from '@/Types/User';
import { useRoute } from 'vue-router';

const route = useRoute();

const setInitialStates = async () => {
  (await usersStore.getUserById(+route.params.id)) as User;
};

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">User Details</h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/user-list')"
        >Users List</x-button
      >
      <x-button
        color="orange"
        size="md"
        @click="$router.push(`/update-user/${user?.id}`)"
        >Edit User</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <div class="p-4 rounded shadow mb-6 bg-white">
    <dl class="grid md:grid-cols-2 gap-x-6 gap-y-4">
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">NAME</dt>
        <dd>{{ user?.name ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">EMAIL</dt>
        <dd>{{ user?.email ?? 'N/A' }}</dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Roles</dt>
        <dd>
          <x-tag
            class="mx-1"
            color="success"
            size="xs"
            v-for="role in user?.roles"
            :key="role.id"
            >{{ role }}</x-tag
          >
        </dd>
      </div>
      <div class="grid sm:grid-cols-2">
        <dt class="font-medium">Permissions</dt>
        <dd>
          <x-tag
            class="mx-1"
            color="success"
            size="xs"
            v-for="permission in user?.permissions"
            :key="permission.id"
            >{{ permission }}</x-tag
          >
        </dd>
      </div>
    </dl>
  </div>
</template>
