<script lang="ts" setup>
import { Company } from '@/Types/Company';
import { useCompaniesStore } from '@/stores/CompanyStore';

const companyForm = ref<Company>(new Company());
const route = useRoute();

const isEdit = computed(() => !!route.params.id);
const companiesStore = useCompaniesStore();

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const { is_required, is_email } = useRules();

const computedUsers = computed(() => {
  return users.value.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
});

const handleSubmit = async (isValid: any) => {
  companyForm.value = Company.cleanObject(companyForm.value) as Company;
  if (!isValid) return;
  if (isEdit.value)
    await companiesStore.updateCompany(
      route.params.id as string,
      companyForm.value
    );
  else await companiesStore.createCompany(companyForm.value);
};

const setInitialState = async () => {
  await usersStore.fetchUsers({ name: '', email: '' });
  companyForm.value.user_id = users.value[0].id;
};
onMounted(() => setInitialState());
</script>
<template>
  <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold">
      {{ isEdit ? 'Update' : 'Create' }} Company
    </h2>
    <div class="flex space-x-2 items-center">
      <x-button
        color="primary"
        size="md"
        @click="$router.push('/companies-list')"
        >Companies List</x-button
      >
    </div>
  </div>
  <x-divider class="my-4" />
  <x-form @submit="handleSubmit">
    <div class="grid grid-cols-2 gap-4">
      <x-input label="Name" name="name" v-model="companyForm.name" />
      <x-input
        label="Website"
        name="website"
        v-model="companyForm.website"
        :rules="[is_required]"
      />
      <x-select
        label="Company Owner"
        name="job type"
        v-model="companyForm.user_id"
        :rules="[is_required]"
        :options="computedUsers"
        disabled
      />
      <x-textarea
        label="Description"
        name="description"
        v-model="companyForm.description"
      ></x-textarea>
    </div>

    <div class="flex w-full justify-end mt-4">
      <x-button type="submit" color="success">{{
        isEdit ? 'Update' : 'Create'
      }}</x-button>
    </div>
  </x-form>
</template>
