<script setup>
const props = defineProps({
  links: {
    type: Object,
    required: true,
  },
});

const loading = ref(false);
</script>

<template>
  <div class="flex justify-between items-center gap-2 py-6">
    <x-link
      v-if="+props.links.current_page !== 1"
      :href="props.links.prev_page_url"
      preserve-scroll
      preserve-state
    >
      <x-button tag="div" size="sm" icon-left="prev" :loading="loading">
        Previous
      </x-button>
    </x-link>
    <x-button v-else tag="div" size="sm" icon-left="prev" disabled>
      Previous
    </x-button>

    <div class="text-xs lining-nums font-medium text-center text-gray-700">
      Now displaying: {{ props.links.from }} ~ {{ props.links.to }}
      <span v-if="props.links.total"> of {{ props.links.total }} </span>
      (Page: {{ props.links.current_page }})
    </div>

    <x-link
      v-if="props.links.next_page_url !== null"
      :href="props.links.next_page_url"
      preserve-scroll
      preserve-state
    >
      <x-button tag="div" size="sm" icon-right="next" :loading="loading">
        Next
      </x-button>
    </x-link>
    <x-button v-else tag="div" size="sm" icon-right="next" disabled>
      Next
    </x-button>
  </div>
</template>
