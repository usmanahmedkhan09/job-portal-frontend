<script setup lang="ts">
import { Job } from '@/Types/Job';

const activeTab = ref('jobs');

const isFocused = ref(false);

const jobStore = useJobsStore();
const { jobs } = storeToRefs(jobStore);

const activeJob = ref<Job>(new Job());

// const staticJobs = [
//   {
//     id: 1,
//     title: 'Content Writing Intern',
//     company: 'Hashtag Media',
//     rating: 4.0,
//     location: 'Islamabad',
//     salary: 'Rs 20,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Onsite, Full-Time/Paid Internship',
//     description: 'Craft engaging content for social media and blogs.',
//     activeDays: 7,
//   },
//   {
//     id: 2,
//     title: 'Frontend Developer',
//     company: 'Tech Innovators',
//     rating: 4.5,
//     location: 'Lahore',
//     salary: 'Rs 80,000 a month',
//     jobType: 'Remote',
//     jobDetails: 'Vue.js, Tailwind CSS, UI/UX',
//     description: 'Develop modern UIs with Vue 3 and Tailwind CSS.',
//     activeDays: 3,
//   },
//   {
//     id: 3,
//     title: 'Backend Engineer',
//     company: 'Soft Solutions',
//     rating: 4.2,
//     location: 'Karachi',
//     salary: 'Rs 120,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Laravel, Node.js, MongoDB',
//     description: 'Design and develop REST APIs and backend logic.',
//     activeDays: 5,
//   },
//   {
//     id: 4,
//     title: 'Graphic Designer',
//     company: 'Creative Minds',
//     rating: 4.1,
//     location: 'Islamabad',
//     salary: 'Rs 60,000 a month',
//     jobType: 'Part-time',
//     jobDetails: 'Adobe Photoshop, Illustrator',
//     description: 'Create visual content for social media and ads.',
//     activeDays: 2,
//   },
//   {
//     id: 5,
//     title: 'Social Media Manager',
//     company: 'Marketing Gurus',
//     rating: 4.3,
//     location: 'Lahore',
//     salary: 'Rs 50,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Facebook, Instagram, Twitter',
//     description: 'Plan and execute social media campaigns.',
//     activeDays: 6,
//   },
//   {
//     id: 6,
//     title: 'Data Analyst',
//     company: 'Data Wizards',
//     rating: 4.6,
//     location: 'Karachi',
//     salary: 'Rs 100,000 a month',
//     jobType: 'Remote',
//     jobDetails: 'SQL, Python, Power BI',
//     description: 'Analyze and visualize data trends.',
//     activeDays: 4,
//   },
//   {
//     id: 7,
//     title: 'HR Manager',
//     company: 'People First',
//     rating: 4.0,
//     location: 'Islamabad',
//     salary: 'Rs 75,000 a month',
//     jobType: 'Onsite',
//     jobDetails: 'Recruitment, Employee Relations',
//     description: 'Manage hiring and employee well-being.',
//     activeDays: 8,
//   },
//   {
//     id: 8,
//     title: 'Digital Marketing Specialist',
//     company: 'Ad Experts',
//     rating: 4.4,
//     location: 'Lahore',
//     salary: 'Rs 90,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'SEO, PPC, Content Marketing',
//     description: 'Execute paid ad campaigns and SEO strategies.',
//     activeDays: 3,
//   },
//   {
//     id: 9,
//     title: 'iOS Developer',
//     company: 'App Tech',
//     rating: 4.5,
//     location: 'Karachi',
//     salary: 'Rs 130,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Swift, Xcode, iOS SDK',
//     description: 'Develop mobile applications for iOS.',
//     activeDays: 5,
//   },
//   {
//     id: 10,
//     title: 'Android Developer',
//     company: 'Mobile Solutions',
//     rating: 4.2,
//     location: 'Islamabad',
//     salary: 'Rs 125,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Kotlin, Jetpack Compose',
//     description: 'Build high-performance Android apps.',
//     activeDays: 6,
//   },
//   {
//     id: 11,
//     title: 'DevOps Engineer',
//     company: 'Cloud Infra',
//     rating: 4.7,
//     location: 'Lahore',
//     salary: 'Rs 150,000 a month',
//     jobType: 'Remote',
//     jobDetails: 'AWS, Docker, Kubernetes',
//     description: 'Automate and manage cloud infrastructure.',
//     activeDays: 2,
//   },
//   {
//     id: 12,
//     title: 'Cyber Security Analyst',
//     company: 'SecureTech',
//     rating: 4.8,
//     location: 'Karachi',
//     salary: 'Rs 140,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Penetration Testing, Network Security',
//     description: 'Analyze and improve cyber security measures.',
//     activeDays: 4,
//   },
//   {
//     id: 13,
//     title: 'Customer Support Executive',
//     company: 'Client First',
//     rating: 4.0,
//     location: 'Islamabad',
//     salary: 'Rs 45,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Email, Chat, Call Support',
//     description: 'Assist customers with queries and issues.',
//     activeDays: 9,
//   },
//   {
//     id: 14,
//     title: 'Project Manager',
//     company: 'AgileWorks',
//     rating: 4.3,
//     location: 'Lahore',
//     salary: 'Rs 110,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Scrum, Agile, Jira',
//     description: 'Manage teams and project delivery timelines.',
//     activeDays: 5,
//   },
//   {
//     id: 15,
//     title: 'Business Analyst',
//     company: 'Biz Insights',
//     rating: 4.1,
//     location: 'Karachi',
//     salary: 'Rs 95,000 a month',
//     jobType: 'Remote',
//     jobDetails: 'Market Research, Data Analysis',
//     description: 'Analyze business needs and market trends.',
//     activeDays: 7,
//   },
//   {
//     id: 16,
//     title: 'Software Tester',
//     company: 'QA Solutions',
//     rating: 4.5,
//     location: 'Islamabad',
//     salary: 'Rs 85,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Manual & Automated Testing',
//     description: 'Test software for bugs and performance issues.',
//     activeDays: 3,
//   },
//   {
//     id: 17,
//     title: 'Full Stack Developer',
//     company: 'Code House',
//     rating: 4.6,
//     location: 'Lahore',
//     salary: 'Rs 130,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Vue.js, Node.js, MongoDB',
//     description: 'Develop web applications from frontend to backend.',
//     activeDays: 4,
//   },
//   {
//     id: 18,
//     title: 'AI Engineer',
//     company: 'AI Labs',
//     rating: 4.7,
//     location: 'Karachi',
//     salary: 'Rs 200,000 a month',
//     jobType: 'Remote',
//     jobDetails: 'Python, Machine Learning, TensorFlow',
//     description: 'Develop AI-powered applications and models.',
//     activeDays: 2,
//   },
//   {
//     id: 19,
//     title: 'Video Editor',
//     company: 'Creative Studios',
//     rating: 4.3,
//     location: 'Islamabad',
//     salary: 'Rs 70,000 a month',
//     jobType: 'Part-time',
//     jobDetails: 'Adobe Premiere, Final Cut Pro',
//     description: 'Edit videos for marketing and social media.',
//     activeDays: 8,
//   },
//   {
//     id: 20,
//     title: 'Blockchain Developer',
//     company: 'Crypto Innovate',
//     rating: 4.8,
//     location: 'Lahore',
//     salary: 'Rs 180,000 a month',
//     jobType: 'Full-time',
//     jobDetails: 'Solidity, Smart Contracts, Web3',
//     description: 'Develop decentralized applications and blockchain solutions.',
//     activeDays: 5,
//   },
// ];

function changeTab(tab: string) {
  activeTab.value = tab;
}

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
  await jobStore.fetchJobs();
  activeJob.value = jobs.value[0] || new Job();
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
        :company="job.company"
        :rating="job.rating"
        :location="job.location"
        :salary="job.salary_range"
        :jobType="job.job_type"
        :jobDetails="job.requirements"
        :description="job.description"
        :activeDays="job.activeDays"
        @click="activeJob = job"
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
    <h1 class="font-bold text-lg">No recent searches yet</h1>
    <p>
      After you run a search, your recent <br />
      searches will live here.
    </p>
    <x-button color="primary" outlined @click="isFocused = true"
      >Start a search</x-button
    >
  </div>
</template>
