<script setup lang="ts">
import User from '@/Types/User';

const rolesStore = useRolesStore();
const { roles } = storeToRefs(rolesStore);

const permissionsStore = usePermissionsStore();
const { permissions } = storeToRefs(permissionsStore);

const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

const route = useRoute();

const { is_required, is_email } = useRules();

function confirmPasswordRule() {
  if (userForm.value.password !== userForm.value.confirm_password) {
    return 'Passwords do not match.';
  }
  return true;
}

const userForm = ref<User>(new User());

const isEdit = computed(() => !!route.params.id);

const setInitialStates = async () => {
  if (isEdit.value) {
    userForm.value =
      (await usersStore.getUserById(+route.params.id)) || new User();
  }

  await rolesStore.fetchRoles();
  await permissionsStore.fetchPermissions(null, false);
};

async function createUser(isValid: any): Promise<void> {
  if (!isValid) return;
  if (isEdit.value)
    await usersStore.updateUser(route.params.id as string, userForm.value);
  else await usersStore.addUser(userForm.value);
}

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} User
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/user-list')"
        >Users List</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="createUser">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        label="Name"
        name="name"
        v-model="userForm.name"
        :rules="[is_required]"
      />
      <x-input
        label="Email"
        name="email"
        v-model="userForm.email"
        :rules="[is_required, is_email]"
      />
      <x-input
        label="Password"
        name="password"
        type="password"
        v-model="userForm.password"
        :rules="isEdit ? [] : [is_required]"
      />
      <x-input
        label="Confirm Password"
        name="confirm_password"
        type="password"
        v-model="userForm.confirm_password"
        :rules="isEdit ? [] : [is_required, confirmPasswordRule]"
      />
      <x-select
        v-model="userForm.roles"
        label="Role"
        name="role"
        filterable
        :rules="[is_required]"
        :options="roles.map((x) => ({ label: x.name, value: x.name }))"
        multiple
      />
      <x-select
        label="Permissions"
        name="permissions"
        filterable
        v-model="userForm.permissions"
        :options="permissions.map((x) => ({ label: x.name, value: x.name }))"
        multiple
      />
      <x-input
        label="Company Name"
        v-model="userForm.company_name"
        name="company_name"
      />
      <x-input
        label="Company Website"
        v-model="userForm.company_website"
        name="company_website"
      />
      <x-textarea
        label="Company Description"
        v-model="userForm.company_description"
        name="company_website"
      />
    </div>
    <div class="flex w-full justify-end">
      <x-button type="submit" color="success">{{
        isEdit ? 'Update' : 'Create'
      }}</x-button>
    </div>
  </x-form>
</template>
