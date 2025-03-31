<script setup lang="ts">
import { Job } from '@/Types/Job';
import HomeSearchBar from '../components/HomeSearchBar.vue';

const activeTab = ref('jobs');

const isFocused = ref(false);

const jobStore = useJobsStore();
const { jobs } = storeToRefs(jobStore);

const activeJob = ref<Job>(jobs.value[0] || new Job());

const { get } = useCookies(['search_history']);

function changeTab(tab: string) {
  activeTab.value = tab;
}

const computedSearchHistory = computed(() => {
  return get('search_history') || [];
});

function adjustJobDetailsHeight() {
  let jobDetails = document.getElementById('jobDetails');
  let homeHeader = document.getElementById('homeHeader');
  let mainHeader = document.getElementById('mainHeader');
  let footer = document.getElementById('footer');

  if (!jobDetails || !homeHeader || !mainHeader || !footer) return;

  let scrollY = window.scrollY;
  let windowHeight = window.innerHeight;

  let homeHeaderHeight = homeHeader.offsetHeight;
  let mainHeaderHeight = mainHeader.offsetHeight;
  let footerOffset = footer.offsetTop;

  let headersHeight = homeHeaderHeight + mainHeaderHeight;

  // Calculate the max height dynamically
  let availableHeight = footerOffset - scrollY - 20; // Prevent overflow
  let maxHeight = Math.min(windowHeight - headersHeight - 20, availableHeight);

  // Set height properly
  jobDetails.style.height = maxHeight + 'px';
  jobDetails.style.overflowY = 'auto';
}

// Run on scroll and resize
window.addEventListener('load', adjustJobDetailsHeight);
window.addEventListener('resize', adjustJobDetailsHeight);
window.addEventListener('scroll', adjustJobDetailsHeight);

onUnmounted(() => {
  window.removeEventListener('load', adjustJobDetailsHeight);
  window.removeEventListener('resize', adjustJobDetailsHeight);
  window.removeEventListener('scroll', adjustJobDetailsHeight);
});

const setInitialState = async () => {
  await jobStore.fetchJobs({ title: null, location: null });
  activeJob.value = jobs.value[0] || new Job();
};

const handleSelectedJob = (job: Job) => {
  activeJob.value = job;
};

const fetchJobs = async (job: any) => {
  await jobStore.fetchJobs({ title: job.title, location: job.location });
  activeTab.value = 'jobs';
};
onMounted(() => {
  setInitialState();
});
</script>
<template>
  <div id="homeHeader">
    <div class="flex justify-center" ref="el">
      <HomeSearchBar
        class="border flex gap-2 items-center justify-between md:min-w-[800px] p-2 rounded-lg shadow"
        :focus="isFocused"
      />
    </div>
    <div class="flex justify-center mt-5">
      <p class="font-bold text-primary text-xl flex items-center gap-2">
        Post your CV -
        <span class="text-black text-[16px] font-normal">
          It only takes a few seconds</span
        >
      </p>
    </div>

    <div class="flex justify-center mt-10 border-b border-gray-200">
      <div class="min-w-[450px]">
        <div class="flex justify-between items-center mb-4 cursor-pointer">
          <span
            class="relative text-lg font-semibold text-gray-800"
            :class="{
              'after:block after:h-[4px] after:w-[320px] after:bg-primary-500 after:absolute after:top-10 after:left-1/2 after:-translate-x-1/2':
                activeTab === 'jobs',
            }"
            @click="changeTab('jobs')"
          >
            Jobs for you
          </span>
          <span
            :class="{
              'after:block after:h-[4px] after:w-[320px] after:bg-primary-500 after:absolute after:top-10 after:left-1/2 after:-translate-x-1/2':
                activeTab === 'companies',
            }"
            class="relative text-lg font-semibold text-gray-800"
            @click="changeTab('companies')"
          >
            Recent Searches
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-5 gap-5" v-if="activeTab === 'jobs'">
    <div class="basis-sm">
      <JobCard
        v-if="jobs.length > 0"
        v-for="job in jobs"
        :key="job.id"
        :title="job.title"
        :company="job?.company"
        :rating="job?.rating"
        :location="job.location"
        :salary="job.salary_range"
        :jobType="job.job_type"
        :jobDetails="job.requirements"
        :description="job.description"
        :activeDays="job?.activeDays"
        @click="handleSelectedJob(job)"
      />
    </div>
    <div class="basis-lg">
      <h1 class="hidden">sticky Heading</h1>
      <JobDetail
        v-if="jobs.length > 0"
        id="jobDetails"
        class="top-[1rem] sticky min-h-[850px]"
        :job="activeJob"
      />
    </div>
  </div>
  <div
    class="flex justify-center items-center flex-col mt-5 gap-2 text-center"
    v-else
  >
    <div v-if="computedSearchHistory.length === 0">
      <h1 class="font-bold text-lg">No recent searches yet</h1>
      <p>
        After you run a search, your recent <br />
        searches will live here.
      </p>
      <x-button color="primary" outlined @click="isFocused = true"
        >Start a search</x-button
      >
    </div>
    <template v-else>
      <JobSearchItem
        class="min-w-[600px]"
        v-for="job in computedSearchHistory"
        :key="job.title"
        :job="job"
        @handleSelectedJob="fetchJobs"
      />
    </template>
  </div>
</template>
