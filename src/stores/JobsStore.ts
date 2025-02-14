import { ApiResponse, Pagination } from "@/Types/ApiResponse";
import { Job } from "@/Types/Job";

export const useJobsStore = defineStore('jobs', () =>
{
    const jobs = ref<Job[]>([])
    const job = ref<Job>(new Job());
    const { useCleanObj } = useUtils();
    const pagination = ref<Pagination<Job>>(new Pagination());
    const { set, get } = useCookies(['search_history']);

    const allJobs = computed(() => jobs.value);
    async function fetchJobs(job: Pick<Job, 'title' | 'location'>): Promise<void>
    {
        const response = await axios.get<ApiResponse<Job[]>>('/get-all-jobs', { params: { ...job } });
        const { success, statusCode, data } = response.data;
        let id = '_' + Math.random().toString(36).substr(2, 9);
        const searchHistory = get('search_history');
        const isJobPresent = searchHistory?.some(history => history.title === job.title && history.location === job.location);
        if (!isJobPresent && (job.title || job.location))
            set('search_history', searchHistory ? [...searchHistory, { ...job, count: data.length + 1, id: id }] : [{ ...job, count: data.length + 1, id: id }]);

        if (success && statusCode === 200)
            jobs.value = data;
    }

    async function getJobs(job: Job = new Job()): Promise<void>
    {
        const response = await axios.get<ApiResponse<Pagination<Job>>>('/get-jobs', { params: { ...Job.cleanObject(useCleanObj(job)) } });
        const { success, statusCode, data } = response.data;
        if (success && statusCode === 200)
        {
            jobs.value = data.data;
            pagination.value = Pagination.fromApiResponse(response.data);
        }
    }

    async function createJob(job: Job): Promise<void>
    {
        const response = await axios.post<ApiResponse<{ job: Job }>>('/jobs', job);
        let { data } = response.data;
        jobs.value.push(data.job);
    }

    async function updateJob(jobId: string, job: Job): Promise<void>
    {
        const response = await axios.put<ApiResponse<{ job: Job }>>(`/jobs/${jobId}`, job);
        let { data } = response.data;
        const index = jobs.value.findIndex(p => p.id === job.id);
        jobs.value[index] = data.job;

    }

    async function getJobById(id: string): Promise<Job>
    {
        const response = await axios.get<ApiResponse<{ job: Job }>>(`/jobs/${id}/edit`);
        let { data } = response.data;
        job.value = { ...data.job };
        return data.job;

    }

    return { fetchJobs, updateJob, createJob, getJobById, jobs, job, pagination, allJobs, getJobs };

})