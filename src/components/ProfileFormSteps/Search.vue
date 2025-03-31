<script lang="ts" setup>
const selected = ref('a');
</script>

<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl flex flex-col gap-7"
  >
    <h1 class="text-xl font-bold">
      Want to allow employers to find you on Indeed?
    </h1>
    <div class="flex flex-col gap-5">
      <div class="border p-3 rounded-lg border-primary-500">
        <div class="flex justify-between items-center">
          <h2 class="font-bold flex items-center gap-1">
            <x-icon icon="visible" size="lg" /> Searchable on Careerhub
          </h2>
          <x-radio v-model="selected" value="a"></x-radio>
        </div>
        <p class="mt-2">
          Employers can find your resume in searches through Careerhub and may
          contact you about jobs according to our terms.
        </p>
      </div>
      <div class="border p-3 rounded-lg border-primary-500">
        <div class="flex justify-between items-center">
          <h2 class="font-bold flex items-center gap-1">
            <x-icon icon="eyeOff" size="lg" /> Searchable on Careerhub
          </h2>
          <x-radio v-model="selected" value="b"></x-radio>
        </div>
        <p class="mt-2">
          Employers can’t find your resume in searches through Indeed or contact
          you about jobs. However, employers you’ve been in contact with are
          still able to contact you.
        </p>
      </div>
      <a href="" class="underline">Privacy Policy</a>
    </div>
  </div>
</template>
