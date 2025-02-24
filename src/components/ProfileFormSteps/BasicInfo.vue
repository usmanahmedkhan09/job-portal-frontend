<script lang="ts" setup>
function onSubmit() {
  console.log('Form submitted');
}

const form = reactive({
  firstName: '',
  lastName: '',
});
</script>

<template>
  <div class="mx-auto max-w-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-5">What is your name?</h2>
    <x-form @submit="onSubmit" class="flex flex-col gap-4">
      <x-input class="" label="First Name" v-model="form.firstName" />
      <x-input label="Last Name" v-model="form.lastName" />
    </x-form>
  </div>
</template>
