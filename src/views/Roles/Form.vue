<script setup lang="ts">
import Role from '@/Types/Role';

const rolesStore = useRolesStore();
const { role } = storeToRefs(rolesStore);

const permissionsStore = usePermissionsStore();
const { permissions } = storeToRefs(permissionsStore);

const route = useRoute();

const { is_required } = useRules();

const roleForm = ref<Role>(role.value);

const isEdit = computed(() => !!route.params.id);

const computedPermissions = computed(() =>
  permissions.value.map((item) => ({ label: item.name, value: item.id }))
);

const setInitialStates = async () => {
  await permissionsStore.fetchPermissions();
  if (isEdit.value) {
    roleForm.value = (await rolesStore.getRoleById(+route.params.id)) as Role;
    roleForm.value.permissions = roleForm.value.permissions.map(
      (item) => item.id
    ) as any[];
  }
  await rolesStore.fetchRoles();
};

async function onSubmit(isValid: any): Promise<void> {
  if (!isValid) return;
  if (isEdit.value) {
    await rolesStore.updateRole(route.params.id as string, roleForm.value);
  } else {
    await rolesStore.createRole(roleForm.value);
  }
}

onMounted(() => {
  setInitialStates();
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} Role
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button color="primary" size="md" @click="$router.push('/roles-list')">
        Roles List
      </x-button>
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        v-model="roleForm.name"
        label="Name"
        placeholder="Enter role name"
        :rules="[is_required]"
      />
      <x-select
        v-model="roleForm.permissions"
        label="Permissions"
        placeholder="Select permissions"
        multiple
        :options="computedPermissions"
        native
      />
    </div>
    <div class="flex justify-end">
      <x-button type="submit" color="primary">
        {{ isEdit ? 'Update' : 'Create' }}
      </x-button>
    </div>
  </x-form>
</template>
