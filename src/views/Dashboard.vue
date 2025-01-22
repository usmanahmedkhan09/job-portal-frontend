<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <x-button color="primary">Create New</x-button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <x-card class="bg-white">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Total Applications</p>
              <h3 class="text-2xl font-bold">1,234</h3>
            </div>
            <div class="bg-primary-100 p-3 rounded-full">
              <x-icon
                icon=""
                name="document"
                class="w-6 h-6 text-primary-500"
              />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-500">+12%</span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </x-card>

      <x-card class="bg-white">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Active Jobs</p>
              <h3 class="text-2xl font-bold">56</h3>
            </div>
            <div class="bg-success-100 p-3 rounded-full">
              <x-icon
                icon=""
                name="briefcase"
                class="w-6 h-6 text-success-500"
              />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-500">+5%</span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </x-card>

      <x-card class="bg-white">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Interviews</p>
              <h3 class="text-2xl font-bold">89</h3>
            </div>
            <div class="bg-warning-100 p-3 rounded-full">
              <x-icon icon="" name="users" class="w-6 h-6 text-warning-500" />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-500">+18%</span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </x-card>

      <x-card class="bg-white">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Hired</p>
              <h3 class="text-2xl font-bold">24</h3>
            </div>
            <div class="bg-error-100 p-3 rounded-full">
              <x-icon
                icon=""
                name="check-circle"
                class="w-6 h-6 text-error-500"
              />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-500">+8%</span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </x-card>
    </div>

    <!-- Recent Applications Table -->
    <x-card class="bg-white">
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4">Recent Applications</h2>
        <x-table :columns="columns" :rows="applications" class="w-full">
          <template #status="{ value }">
            <x-badge :color="getStatusColor(value)">{{ value }}</x-badge>
          </template>
        </x-table>
      </div>
    </x-card>
  </div>
</template>

<script setup lang="ts">
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'date', label: 'Applied Date' },
  { key: 'status', label: 'Status' },
];

const applications = [
  {
    name: 'John Doe',
    position: 'Frontend Developer',
    date: '2024-01-15',
    status: 'Pending',
  },
  {
    name: 'Jane Smith',
    position: 'UI/UX Designer',
    date: '2024-01-14',
    status: 'Interviewed',
  },
  {
    name: 'Mike Johnson',
    position: 'Backend Developer',
    date: '2024-01-13',
    status: 'Hired',
  },
  {
    name: 'Sarah Wilson',
    position: 'Product Manager',
    date: '2024-01-12',
    status: 'Rejected',
  },
  {
    name: 'Tom Brown',
    position: 'DevOps Engineer',
    date: '2024-01-11',
    status: 'Pending',
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    Pending: 'warning',
    Interviewed: 'info',
    Hired: 'success',
    Rejected: 'error',
  };
  return colors[status as keyof typeof colors] || 'default';
};
</script>
