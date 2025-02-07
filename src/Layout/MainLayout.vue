<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="fixed w-64 h-screen bg-primary-700">
      <div class="p-4 border-b border-gray-700">
        <h1 class="text-white text-xl font-bold text-center">Career Hub</h1>
      </div>
      <x-menu
        class="p-2 text-white x-menu-item"
        color="secondary"
        :items="computedMenu"
      />
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Top Bar -->
      <header class="h-16 bg-white shadow-sm fixed w-[calc(100%-16rem)] z-10">
        <div class="flex items-center justify-between h-full px-8">
          <div class="w-96">
            <input
              type="search"
              placeholder="Search..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex items-center space-x-6" v-if="false">
            <router-link to="/profile" class="text-gray-600 hover:text-gray-900"
              >Profile</router-link
            >
            <router-link
              to="/settings"
              class="text-gray-600 hover:text-gray-900"
              >Settings</router-link
            >
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="pt-16 bg-gray-50">
        <div class="p-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuArrayItem } from '@indielayer/ui';

const userStore = useUsersStore();
const { user } = storeToRefs(userStore);

const permissionsEnum: any = useStorage('permissionsEnum', []).value;
const localStoragePermissions: any = useStorage('permissions', []).value;

const userPermissions = computed(() => {
  return localStoragePermissions;
});

const mainList: (MenuArrayItem & { permission?: string })[] = [
  {
    label: 'Dashboard',
    to: '/',
    value: '',
    icon: '',
  },
  {
    label: 'Admin',
    value: '',
    icon: '',
    items: [
      {
        to: '/user-list',
        label: 'Users',
        value: '',
        exact: true,
        permission: permissionsEnum.USER_MENU,
        icon: '',
      },
      {
        to: '/permission-list',
        label: 'Permissions',
        value: '',
        exact: true,
        permission: permissionsEnum.PERMISSION_MENU,
        icon: '',
      },
      {
        to: 'roles-list',
        label: 'Roles',
        value: '',
        exact: true,
        permission: permissionsEnum.ROLE_MENU,
        icon: '',
      },
    ],
    permission: 'admin',
  },
  {
    label: 'Jobs',
    value: '',
    to: '',
    icon: '',
    items: [
      {
        to: '/jobs-list',
        label: 'Jobs List',
        value: '',
        exact: true,
        permission: permissionsEnum.JOB_MENU,
        icon: '',
      },
      {
        to: '/jobs-applications-list',
        label: 'Jobs Applications',
        value: '',
        exact: true,
        permission: permissionsEnum.JOB_MENU,
        icon: '',
      },
      {
        to: '/job-categories',
        label: 'Jobs Categories',
        value: '',
        exact: true,
        permission: permissionsEnum.JOB_MENU,
        icon: '',
      },
    ],
  },
];

const computedMenu = computed(() => {
  return mainList;
  // return mainList.map((menu) => {
  //   let item = { ...menu };
  //   if (item.items) {
  //     item.items = item.items.filter((subItem) => {
  //       if (subItem.permission) {
  //         const hasPermission = userPermissions.value.includes(
  //           subItem.permission
  //         );
  //         if (!hasPermission) {
  //           return null;
  //         }
  //       }
  //       return subItem;
  //     });
  //   }
  //   return item;
  // });
});
</script>
