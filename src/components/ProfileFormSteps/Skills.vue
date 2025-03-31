<script lang="ts" setup>
const userSkills = ref([
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'HTML',
  'CSS',
  'SQL',
  'NoSQL',
  'Python',
  'Java',
  'C++',
]);

const selectedSkills = ref<string[]>([]);

const handleSelectedSkill = (skill) => {
  selectedSkills.value.push(skill);
  userSkills.value = userSkills.value.filter((item) => item != skill);
};
</script>

<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl flex flex-col gap-7"
  >
    <div class="">
      <h1 class="text-xl font-bold">What are some of your skills?</h1>
      <p class="font-medium">We recommend adding at least 6 skills</p>
    </div>

    <div>
      <div
        v-if="selectedSkills.length > 0"
        class="border-dotted border p-2 rounded-lg mb-2 flex justify-between items-center"
        v-for="selectedSkill in selectedSkills"
      >
        <p>{{ selectedSkill }}</p>
        <x-icon icon="trash" size="lg" />
      </div>
      <div v-else class="border-dotted border p-2 rounded-lg">
        Your skills will appear here
      </div>
    </div>

    <x-form class="mt-3 flex flex-col gap-3">
      <x-divider></x-divider>
      <x-select label="Add Skills" placeholder="Please add skills"></x-select>
      <div class="">
        <div class="bg-primary-100 rounded-lg p-4 flex flex-col gap-2">
          <p class="mb-3">Do you want to add any of these skills?</p>
          <p
            class="cursor-pointer flex items-center gap-3 bg-white p-2 rounded-md border text-primary font-medium text-lg hover:bg-primary-100 hover:border-primary-500"
            v-for="skill in userSkills"
            @click="handleSelectedSkill(skill)"
          >
            <x-icon icon="add" size="lg"></x-icon>
            <span>{{ skill }}</span>
          </p>
        </div>
      </div>
    </x-form>
  </div>
</template>
