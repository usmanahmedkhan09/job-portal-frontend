<template>
  <div class="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl">
    <h1 class="text-xl font-bold">Add work experience</h1>

    <x-form class="mt-3 flex flex-col gap-3">
      <x-input label="Job title" placeholder="Job title"></x-input>
      <x-input label="Company" placeholder="company" />
      <x-select label="Select Country" placeholder="Select Country"></x-select>
      <x-input
        label="Street Address"
        placeholder="Select street address"
      ></x-input>
      <p class="font-medium">Time Period</p>
      <x-checkbox label="Currently enrolled"></x-checkbox>
      <p class="font-medium">Form</p>
      <div class="flex items-center gap-3">
        <x-select placeholder="Month" class="w-full"></x-select>
        <x-select placeholder="Year" class="w-full"></x-select>
      </div>
      <p class="font-medium">To</p>
      <div class="flex items-center gap-3">
        <x-select placeholder="Month" class="w-full"></x-select>
        <x-select placeholder="Year" class="w-full"></x-select>
      </div>
      <x-textarea
        name=""
        id=""
        label="Additional details"
        placeholder="Include relevant projects, achievements, and affiliations."
        rows="10"
      ></x-textarea>
    </x-form>
  </div>
</template>
