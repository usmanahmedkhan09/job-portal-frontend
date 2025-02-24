<script lang="ts" setup>
const step = ref(1);
const steps = [
  {
    label: '',
    description: '',
    status: '',
  },
  { label: 'One more step i know', status: 'incomplete' },
  { label: 'Almost there', status: 'error' },
  { label: 'Lets go' },
  { label: 'Finish line', disabled: true },
];
</script>
<template>
  <div>
    <x-card
      class="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-lg flex flex-col items-start"
    >
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-800">
          Add a resume to careerhub
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <x-button
          color="primary"
          class="hover:bg-blue-700 text-white font-bold rounded min-w-50"
          size="lg"
        >
          Upload resume
        </x-button>
        <x-button
          color="primary"
          class="hover:bg-blue-700 text-white font-bold rounded min-w-50"
          size="lg"
        >
          Build a careerhub Resume
        </x-button>
      </div>
      <div class="mt-4 text-sm text-gray-600">
        By continuing, you agree to receive job opportunities from careerhub.
      </div>
    </x-card>
    <div class="mt-5">
      <Index />
    </div>
  </div>
</template>
