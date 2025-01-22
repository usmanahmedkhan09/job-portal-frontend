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
}


