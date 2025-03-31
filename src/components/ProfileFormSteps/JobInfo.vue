<script lang="ts" setup>
const jobTitles = ref(['Software engineer', 'Web developer']);
const jobTypes = ref(['Full-time', 'Contract']);
</script>

<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl flex flex-col gap-7"
  >
    <h1 class="text-xl font-bold">
      What are you looking for in your next job?
    </h1>
    <p>
      Tell us the job details you’re interested in to get better recommendations
      across Indeed.
    </p>
    <p>
      Employers may see these preferences when your resume is set to searchable.
    </p>
    <div class="flex flex-col gap-10">
      <x-divider />
      <div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            <x-icon size="lg" icon="user" />
            <h2 class="font-bold">Job titles</h2>
          </div>
          <x-icon class="" size="lg" icon="add" />
        </div>
        <div class="flex px-8 pt-1" v-for="title in jobTitles">
          {{ title }}
        </div>
      </div>

      <x-divider />
      <div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            <x-icon size="lg" icon="cash" />
            <h2 class="font-bold">Minimum base pay</h2>
          </div>
          <x-icon class="" size="lg" icon="add" />
        </div>
        <p class="px-8 pt-1">500,0000</p>
      </div>

      <x-divider />
      <div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            <x-icon size="lg" icon="briefcase" />
            <h2 class="font-bold">Add jobs types</h2>
          </div>
          <x-icon class="" size="lg" icon="add" />
        </div>
        <div class="flex px-8 pt-1" v-for="title in jobTypes">
          {{ title }}
        </div>
      </div>

      <x-divider />
      <div class="flex flex-col">
        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            <x-icon size="lg" icon="location" />
            <h2 class="font-bold">Add relocation</h2>
          </div>
          <x-icon class="" size="lg" icon="add" />
        </div>
        <div class="flex px-8 pt-1">USA , Dubai</div>
      </div>
    </div>
  </div>
</template>
