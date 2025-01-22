<script setup lang="ts">
import Permission from '@/Types/Permission';

const permissionsStore = usePermissionsStore();
const { permission } = storeToRefs(permissionsStore);

const route = useRoute();

const { is_required } = useRules();

const permissionForm = ref<Permission>(permission.value);

const isEdit = computed(() => !!route.params.id);

const setInitialStates = async () => {
  if (isEdit.value) {
    permissionForm.value = (await permissionsStore.getPermissionById(
      +route.params.id
    )) as Permission;
  }
  await permissionsStore.fetchPermissions();
};

async function onSubmit(isValid: any): Promise<void> {
  if (!isValid) return;
  if (isEdit.value)
    await permissionsStore.updatePermission(
      route.params.id as string,
      permissionForm.value
    );
  else await permissionsStore.createPermission(permissionForm.value);
}

onMounted(() => {
  setInitialStates();
});
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} Permission
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/permission-list')"
        >Permissions List</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="onSubmit">
    <div class="grid grid-cols-1 gap-4">
      <x-input
        label="Name"
        name="name"
        v-model="permissionForm.name"
        :rules="[is_required]"
      />
    </div>
    <div class="flex w-full justify-end">
      <x-button type="submit" color="success">{{
        isEdit ? 'Update' : 'Create'
      }}</x-button>
    </div>
  </x-form>
</template>
