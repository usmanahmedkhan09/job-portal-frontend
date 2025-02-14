import Permission from './Permission';
import Role from './Role';
export default class User
{
    id: string | null = null;
    name: string | null = null;
    email: string | null = null;
    password?: string | null = null;
    confirm_password?: string | null = null;
    roles: Role[] | [] = [];
    permissions: Permission[] | [] = [];
    token?: string | undefined;
    company_name: string | null = null;
    company_website: string | null = null;
    company_description: string | null = null;
    company_id: string | null = null;
}


