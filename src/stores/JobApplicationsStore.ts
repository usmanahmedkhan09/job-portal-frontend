
import { ApiResponse, Pagination } from "@/Types/ApiResponse";
import { Job } from "@/Types/Job";

export const useJobsApplicationsStore = defineStore('jobsApplications', () =>
{
    const jobsApplications = ref<Job[]>([])
    const { useCleanObj } = useUtils();
    const pagination = ref<Pagination<Job>>(new Pagination());

    async function fetchJobsApplication(job: Job = new Job()): Promise<void>
    {
        const response = await axios.get<ApiResponse<Pagination<Job>>>('/jobs-applications', { params: { ...Job.cleanObject(useCleanObj(job)) } });
        const { success, statusCode, data } = response.data;
        if (success && statusCode === 200)
        {
            jobsApplications.value = data.data;
            pagination.value = Pagination.fromApiResponse(response.data);
        }
    }

    // async function createJob(job: Job): Promise<void>
    // {
    //     const response = await axios.post<ApiResponse<{ job: Job }>>('/jobs', job);
    //     let { data } = response.data;
    //     jobs.value.push(data.job);
    // }

    // async function updateJob(jobId: string, job: Job): Promise<void>
    // {
    //     const response = await axios.put<ApiResponse<{ job: Job }>>(`/jobs/${jobId}`, job);
    //     let { data } = response.data;
    //     const index = jobs.value.findIndex(p => p.id === job.id);
    //     jobs.value[index] = data.job;

    // }

    // async function getJobById(id: string): Promise<Job>
    // {
    //     const response = await axios.get<ApiResponse<{ job: Job }>>(`/jobs/${id}/edit`);
    //     let { data } = response.data;
    //     job.value = { ...data.job };
    //     return data.job;

    // }

    return { fetchJobsApplication, jobsApplications, pagination };

})