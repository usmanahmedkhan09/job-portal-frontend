<script lang="ts">
export interface PhoneInputProps {
  modelValue?: string;
  defaultCountry?: string;
  containerClasses?: string;
  selectClasses?: string;
  inputClasses?: string;
  dropdownClasses?: string;
  dropdownItemClasses?: string;
  countryNameClasses?: string;
  countryCodeClasses?: string;
  gap?: string;
}
</script>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { AsYouType, parsePhoneNumberWithError } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js/types';
import { computed, ref, watch } from 'vue';

type CountryType = {
  name: string;
  dial_code: string;
  code: string;
};

const defaultCountry: CountryType = {
  name: 'Nigeria',
  code: 'NG',
  dial_code: '+234',
};

const { getCountries } = useUtils();
const countries: CountryType[] = getCountries() as CountryType[];

const props = defineProps({
  modelValue: { type: String, default: '' },
  defaultCountry: { type: String, default: 'NG' },
  containerClasses: { type: String, default: '' },
  selectClasses: { type: String, default: '' },
  inputClasses: { type: String, default: '' },
  dropdownClasses: { type: String, default: '' },
  dropdownItemClasses: { type: String, default: '' },
  countryNameClasses: { type: String, default: '' },
  countryCodeClasses: { type: String, default: '' },
  gap: { type: String, default: 'gap-x-2' },
});

const emit = defineEmits([
  'update:modelValue',
  'update:dialCode',
  'update:fullPhoneNumber',
]);

const selectedCountry = ref<CountryType>(
  countries.find((c) => c.code === props.defaultCountry) || defaultCountry
);
const rawPhone = ref(props.modelValue);
const formattedPhone = ref('');
const isOpen = ref(false);

const containerStyle = computed(
  () => `flex items-center ${props.gap} ${props.containerClasses}`
);
const selectStyle = computed(
  () =>
    `appearance-none w-24 px-2 py-3 text-sm bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center ${props.selectClasses}`
);
const inputStyle = computed(
  () =>
    `form-input w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 ${props.inputClasses}`
);
const dropdownStyle = computed(
  () =>
    `absolute z-50 mt-1 w-64 bg-white border border-gray-200 rounded shadow-xl max-h-60 overflow-y-auto ${props.dropdownClasses}`
);
const dropdownItemStyle = computed(
  () =>
    `flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${props.dropdownItemClasses}`
);
const countryNameStyle = computed(
  () => `text-sm text-gray-700 ${props.countryNameClasses}`
);
const countryCodeStyle = computed(
  () => `text-sm text-gray-500 ${props.countryCodeClasses}`
);

watch(selectedCountry, (newCountryCode: CountryType) => {
  formattedPhone.value = new AsYouType(
    newCountryCode.code as CountryCode
  ).input(rawPhone.value);
  emitUpdates();
});

const handleInput = (event: Event) => {
  rawPhone.value = (event.target as HTMLInputElement).value;
  formattedPhone.value = new AsYouType(
    selectedCountry.value.code as CountryCode
  ).input(rawPhone.value);
  emitUpdates();
};

const emitUpdates = () => {
  emit('update:modelValue', formattedPhone.value);
  emit('update:dialCode', selectedCountry.value.code);
  try {
    emit(
      'update:fullPhoneNumber',
      parsePhoneNumberWithError(
        rawPhone.value,
        selectedCountry.value.code as CountryCode
      ).formatInternational()
    );
  } catch (error) {
    emit('update:fullPhoneNumber', rawPhone.value);
  }
};

const selectCountry = (country: CountryType) => {
  selectedCountry.value = country;
  isOpen.value = false;
  formattedPhone.value = new AsYouType(
    selectedCountry.value.code as CountryCode
  ).input(rawPhone.value);
  emitUpdates();
};

function getFlagUrl(countryCode) {
  return `https://flagcdn.com/h40/${countryCode.toLowerCase()}.jpg`;
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const el = useTemplateRef('el');

onClickOutside(el, () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="relative mx-auto" ref="el">
    <label for="phone" class="block text-sm font-medium text-gray-700"
      >Mobile Number</label
    >
    <div
      class="mt-1 flex items-center border border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
      @click.prevent="toggleDropdown"
      @keypress="toggleDropdown"
    >
      <div class="flex items-center" v-if="selectedCountry">
        <div class="w-[40px] mr-1.5 flex items-center justify-center">
          <img
            :src="getFlagUrl(selectedCountry.code)"
            alt="Flag"
            class="rounded max-w-full max-h-full object-contain"
          />
        </div>
        <span class="font-bold"> +{{ selectedCountry.dial_code }} </span>
      </div>
      <input
        class="ml-3 mb-0 w-full border-2 rounded-lg p-3 focus:outline-none"
        type="text"
        placeholder="Enter mobile number"
      />
    </div>
    <div
      v-if="isOpen"
      class="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
    >
      <div
        v-for="country in countries"
        :key="country.code"
        class="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
        @click.prevent="selectCountry(country)"
      >
        <img
          :src="getFlagUrl(country.code)"
          alt="Flag"
          class="mr-2 rounded"
          width="40"
          height="30"
        />
        <span> {{ country.name }} +{{ country.dial_code }} </span>
      </div>
    </div>
  </div>
</template>
