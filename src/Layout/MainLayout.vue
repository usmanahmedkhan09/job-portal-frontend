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
    to: '/dashboard',
    value: '',
    icon: '',
  },
  {
    label: 'Admin',
    value: '',
    icon: '',
    permission: permissionsEnum.ADMIN_MENU,
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
  },
  {
    label: 'Jobs',
    value: '',
    to: '',
    icon: '',
    permission: permissionsEnum.JOB_MENU,
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
        permission: permissionsEnum.JOBS_APPLICATION_LIST,
        icon: '',
      },
      {
        to: '/job-categories',
        label: 'Jobs Categories',
        value: '',
        exact: true,
        permission: permissionsEnum.JOBS_CATEGORIES_LIST,
        icon: '',
      },
    ],
  },
  {
    label: 'Companies',
    value: '',
    to: '',
    icon: '',
    items: [
      {
        to: '/companies-list',
        label: 'Companies List',
        value: '',
        exact: true,
        permission: permissionsEnum.COMPANY_MENU,
        icon: '',
      },
      {
        to: '/companies-applications-list',
        label: 'Companies Applications',
        value: '',
        exact: true,
        permission: permissionsEnum.COMPANY_MENU,
        icon: '',
      },
    ],
  },
  {
    label: 'Company',
    value: '',
    to: '',
    items: [
      {
        to: '/company-users-list',
        label: 'Users List',
        value: '',
        exact: true,
        permission: permissionsEnum.COMPANY_MENU,
        icon: '',
      },
    ],
  },
  {
    label: 'Settings',
    value: '',
    to: '/settings',
    icon: '',
  },
  {
    label: 'Profile',
    value: '',
    to: '/profile',
    icon: '',
  },
  {
    label: 'Logout',
    value: '',
    to: '/logout',
    icon: '',
  },
];

const computedMenu = computed(() => {
  return filterMenuItems(userPermissions.value, mainList);
});

// Function to check permissions
function hasPermission(userPermissions, item) {
  if (
    (item.permission && userPermissions.includes(item.permission)) ||
    item.label == 'Dashboard'
  ) {
    return true;
  }
}

// Function to filter menu items
function filterMenuItems(userPermissions, menuItems) {
  return menuItems.filter((menu) => {
    if (menu.items) {
      let subItems = menu.items.filter((item) => {
        return hasPermission(userPermissions, item);
      });
      if (subItems.length > 0) {
        menu.items = subItems;
      }
    }
    return hasPermission(userPermissions, menu);
  });
}
</script>
