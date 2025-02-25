
import { ApiResponse } from "@/Types/ApiResponse";
import { JobCategory } from "@/Types/Job";
import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

type Filters = {
    name: string;
    skills: string;
}

export const useJobCategoriesStore = defineStore('jobCategories', () =>
{
    const jobCategories = ref<JobCategory[]>([]);
    const jobCategory = ref<JobCategory>(new JobCategory());
    const { handleResponse } = useUtils();

    async function fetchJobCategories(jobCategory: JobCategory = new JobCategory()): Promise<void>
    {
        const response = await axios.get<ApiResponse<{ jobCategories: JobCategory[] }>>('/job-categories');
        const { statusCode, data } = response.data;
        if (statusCode === 200)
            jobCategories.value = [...data.jobCategories]
    }

    async function createJobCategory(jobCategory: JobCategory): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ jobCategory: JobCategory }>> = await axios.post('/job-categories', jobCategory);
            let { data } = response.data;
            jobCategories.value.push(data.jobCategory);

        } catch (error)
        {

        }

    }

    async function updateJobCategory(jobCategoryId: string, jobCategory: JobCategory): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ jobCategory: JobCategory }>> = await axios.put(`/job-categories/${jobCategoryId}`, jobCategory);
            let { data } = response.data;
            const index = jobCategories.value.findIndex(p => p.id === jobCategory.id);
            jobCategories.value[index] = data.jobCategory;

        } catch (error)
        {

        }

    }

    async function deleteJobCategory(jobCategoryId: string): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ jobCategory: JobCategory }>> = await axios.delete(`/job-categories/${jobCategoryId}`);
            let { data } = response.data;
            jobCategories.value = jobCategories.value.filter(p => p.id !== data.jobCategory.id);

        } catch (error)
        {
            console.log(error)
        }

    }

    async function getJobCategoryById(jobCategoryId: string): Promise<JobCategory | undefined>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ jobCategory: JobCategory }>> = await axios.get(`/job-categories/${jobCategoryId}`);
            let { data } = response.data;
            jobCategory.value = data.jobCategory;
            return jobCategory.value

        } catch (error)
        {
            console.log(error)
        }
    }
    return { jobCategories, jobCategory, fetchJobCategories, createJobCategory, updateJobCategory, getJobCategoryById }
})