<script lang="ts" setup>
defineProps({
  job: Object,
});
</script>

<template>
  <div
    class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto border border-gray-200 md:min-w-[750px]"
  >
    <div v-if="!job" class="">
      <div class="flex">
        <x-skeleton class="w-14 h-14 rounded-full flex-shrink-0 mr-2" />
        <div class="w-full">
          <x-skeleton class="" />
          <x-skeleton class="mt-2" />
        </div>
      </div>
      <x-skeleton class="w-full h-20 mt-2" />
      <x-skeleton class="w-full min-h-auto mt-2" />
    </div>
    <div v-else>
      <!-- Job Title -->
      <h2 class="text-xl font-bold text-gray-900">
        {{ job?.title }}
      </h2>

      <!-- Company Info -->
      <div class="text-gray-600 text-sm flex items-center gap-2 mt-2">
        <a
          :href="job?.companyLink"
          target="_blank"
          class="text-blue-600 font-semibold hover:underline"
        >
          {{ job?.company || 'Poshnee Tech (SMC PVT) LTD' }}
        </a>
        •
        <span class="flex items-center"> ⭐ {{ job?.rating || 4.5 }} </span>
      </div>

      <!-- Location & Salary -->
      <p class="text-gray-700 mt-1">{{ job?.location }}</p>
      <p class="text-gray-800 font-semibold">{{ job?.salary_range }}</p>

      <!-- Buttons -->
      <div class="flex items-center gap-3 mt-4">
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply now
        </button>
        <button
          class="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          🔖
        </button>
        <button
          class="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          🔗
        </button>
      </div>

      <!-- Job Details -->
      <div class="border-t border-gray-300 mt-6 pt-4">
        <h3 class="text-lg font-semibold">Job details</h3>
        <p class="text-sm text-gray-500">
          Here's how the job details align with your profile.
        </p>

        <div class="mt-3">
          <div class="flex items-center gap-2">
            💰 <span class="font-medium">Pay:</span>
          </div>
          <p
            class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md inline-block mt-1"
          >
            {{ job?.salary_range }}
          </p>
        </div>

        <div class="mt-3">
          <div class="flex items-center gap-2">
            🏢 <span class="font-medium">Job type:</span>
          </div>
          <p
            class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md inline-block mt-1 capitalize"
          >
            {{ job?.job_type }}
          </p>
        </div>
      </div>

      <!-- Location -->
      <div class="border-t border-gray-300 mt-6 pt-4">
        <h3 class="text-lg font-semibold">Location</h3>
        <p class="flex items-center gap-2 mt-1">📍 {{ job?.location }}</p>
      </div>

      <!-- Job Description -->
      <div class="border-t border-gray-300 mt-6 pt-4">
        <h3 class="text-lg font-semibold">Full job description</h3>
        <p class="mt-2 text-gray-800">
          <span class="font-bold">Job Title:</span> {{ job?.title }}
        </p>
        <p class="mt-2 text-gray-600" v-html="job?.description"></p>
      </div>

      <!-- Job Requirements -->
      <div class="border-t border-gray-300 mt-6 pt-4">
        <h3 class="text-lg font-semibold">Job Requirements</h3>
        <div v-html="job?.requirements"></div>
        <!-- <ul class="mt-2 text-gray-600 list-disc list-inside">
        <li></li>
      </ul> -->
      </div>
    </div>
  </div>
</template>
