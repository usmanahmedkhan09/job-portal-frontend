<script setup lang="ts">
const phoneNumber = ref('033677787');
const { getCountries } = useUtils();
const countries = ref(getCountries());
console.log('countries', countries.value);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl">
    <h1 class="text-[1.75rem] font-bold mb-4">
      Would you like to add a phone number to your resume?
    </h1>
    <div class="mb-4">
      <div class="relative">
        <PhoneInput v-model="phoneNumber" />
      </div>
    </div>
    <div class="mb-4">
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
        <span class="ml-2 text-sm text-gray-700"
          >Show my number on Careerhub</span
        >
      </label>
    </div>
    <button
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
    >
      Submit
    </button>
    <div class="mt-2 text-xs text-gray-600">
      By submitting the form with this box checked, you confirm that you are the
      primary user and subscriber to the telephone number provided, and you
      agree to receive calls (including using artificial or pre-recorded voice),
      texts, and WhatsApp messages from Indeed and employers who use Indeed at
      the telephone number provided above.
    </div>
  </div>
</template>
