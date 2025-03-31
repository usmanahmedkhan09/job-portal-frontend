<template>
  <div class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl">
    <h1 class="text-xl font-bold">Where are you located?</h1>
    <p class="text-lg">This helps match you with nearby jobs</p>

    <x-form class="mt-3 flex flex-col gap-2">
      <x-select label="Select Country" placeholder="Select Country"></x-select>
      <x-input
        label="Street Address"
        placeholder="Select street address"
      ></x-input>
      <x-input label="City, State" placeholder="Select city or state"></x-input>
      <x-input label="Postal Code" placeholder="Postal Code"></x-input>
    </x-form>
  </div>
</template>
