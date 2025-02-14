
import { ApiResponse, Pagination } from "@/Types/ApiResponse";
import { Company, CompanyFilter } from "@/Types/Company";
export const useCompaniesStore = defineStore('companies', () =>
{
    const companies = ref<Company[]>([])
    const company = ref<Company>(new Company());
    const pagination = ref<Pagination<Company>>(new Pagination());

    async function fetchCompanies(company: CompanyFilter): Promise<void>
    {
        const response = await axios.get<ApiResponse<Company[]>>('/companies', { params: { name: company.name, user_id: company.user_id } });
        const { success, statusCode, data } = response.data;

        if (success && statusCode === 200)
            companies.value = data;
    }

    // async function getJobsByUser(job: Job = new Job()): Promise<void>
    // {
    //     const response = await axios.get<ApiResponse<Pagination<Job>>>('/get-job-by-user', { params: { ...Job.cleanObject(useCleanObj(job)) } });
    //     const { success, statusCode, data } = response.data;
    //     if (success && statusCode === 200)
    //     {
    //         jobs.value = data.data;
    //         pagination.value = Pagination.fromApiResponse(response.data);
    //     }
    // }

    async function createCompany(job: Company): Promise<void>
    {
        const response = await axios.post<ApiResponse<{ company: Company }>>('/companies', job);
        let { data } = response.data;
        companies.value.push(data.company);
    }

    async function updateCompany(companyId: string, company: Company): Promise<void>
    {
        const response = await axios.put<ApiResponse<{ company: Company }>>(`/companies/${companyId}`, company);
        let { data } = response.data;
    }

    // async function getJobById(id: string): Promise<Job>
    // {
    //     const response = await axios.get<ApiResponse<{ job: Job }>>(`/jobs/${id}/edit`);
    //     let { data } = response.data;
    //     job.value = { ...data.job };
    //     return data.job;

    // }

    return { fetchCompanies, createCompany, updateCompany, companies, company, pagination };

})