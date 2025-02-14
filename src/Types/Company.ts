import User from "./User";
class Company
{
    readonly id?: string;
    name: string | null = null;
    description: string | null = null;
    website: string | null = null;
    created_at: string | null = null;
    updated_at: string | null = null;
    user: User = new User();
    user_id: string | null = null;

    static cleanObject(data: Partial<Company>): Pick<Company, 'name' | 'description' | 'website' | 'user_id'>
    {
        return {
            name: data.name ?? null,
            description: data.description ?? null,
            website: data.website ?? null,
            user_id: data.user_id ?? null,
        };
    }
}

type CompanyFilter = {
    name: string | null;
    user_id: string | null;
}

export
{
    Company,
    CompanyFilter
};

