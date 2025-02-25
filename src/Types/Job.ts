import { Skills } from "./Skills";
import User from "./User";


class Job
{
    readonly id?: string | undefined;
    title: string | null = null;
    user_id: string | null = null;
    description: string | string = '';
    requirements: string | string = '';
    salary_range: string | null = null;
    location: string | null = null;
    job_type: string | null = null;
    status: string | null = null;
    skills: Skills[] = [];
    category_id: string | null = null;
    readonly created_at: string | null = null;
    readonly updated_at: string | null = null;
    user?: User = new User();
    category?: JobCategory = new JobCategory();
    page: string | null = null;
    company: string | null = null;
    rating: number | null = null;
    activeDays: number | null = null;

    constructor(data: Partial<Job> = {})
    {
        Object.assign(this, data);
    }

    static cleanObject(data: Partial<Job>): Pick<Job, 'user_id' | 'title' | 'description' | 'requirements' | 'salary_range' | 'location' | 'job_type' | 'status' | 'skills' | 'category_id' | 'page'>
    {
        return {
            user_id: data.user_id ?? null,
            title: data.title ?? null,
            description: data.description ?? '',
            requirements: data.requirements ?? '',
            salary_range: data.salary_range ?? null,
            location: data.location ?? null,
            job_type: data.job_type ?? null,
            status: data.status ?? null,
            skills: data.skills ?? [],
            category_id: data.category_id ?? null,
            page: data.page ?? null,
        };
    }
}

class JobCategory
{
    id?: string | undefined;
    name: string | null = null;
    skill: string | null = null;
}

enum JobType
{
    FullTime = 'full-time',
    PartTime = 'part-time',
    Contract = 'contract',
    Temporary = 'temporary',
    Internship = 'internship',
    Volunteer = 'volunteer',
    Remote = 'remote'
}

enum JobStatus
{
    Open = 'open',
    Closed = 'closed',
}

export { Job, JobCategory, JobStatus, JobType };

