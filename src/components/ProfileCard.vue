<script lang="ts" setup>
const navigationList = reactive([
  {
    label: 'Profile',
    to: '/home',
    icon: 'user',
  },
  {
    label: 'My Jobs',
    to: '/register',
    icon: 'bookmark',
  },
  {
    label: 'My Reviews',
    to: '/register',
    icon: 'review',
  },
  {
    label: 'Settings',
    to: '/register',
    icon: 'settings',
  },
  {
    label: 'Help',
    to: '/register',
    icon: 'help',
  },
  {
    label: 'Privacy Center',
    to: '/register',
    icon: 'lock',
  },
]);
</script>

<template>
  <x-popover placement="left-start" popperClass="min-w-64 right-12 p-0">
    <div
      class="rounded p-1 hover:bg-primary-200 hover:border hover:border-gray-300"
    >
      <x-icon class="!h-6 !w-6" icon="user"></x-icon>
    </div>
    <template #content>
      <x-popover-container class="p-0 min-w-lg">
        <ul>
          <li class="p-5 font-medium">
            <span class="font-bold text-lg">usmanahmedkhan@gmail.com</span>
          </li>
          <li
            class="p-5 hover:bg-primary-500 hover:text-white font-medium flex items-center gap-4"
            v-for="link in navigationList"
            :key="link?.label"
          >
            <x-icon class="!h-6 !w-6" :icon="link.icon" />
            <!-- <router-link :to="links.to" class="block py-2 px-4"> -->
            {{ link.label }}
            <!-- </router-link> -->
          </li>
          <x-divider class="" />
          <li
            class="p-5 hover:bg-primary-500 hover:text-white font-medium flex items-center gap-4 justify-center"
          >
            <a href="/logout" class="font-medium text-primary">Sign out</a>
          </li>
        </ul>
      </x-popover-container>
    </template>
  </x-popover>
</template>
