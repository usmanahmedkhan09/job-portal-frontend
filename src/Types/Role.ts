import Permission from "./Permission";

export default class Role
{
    readonly id?: string | undefined;
    name: string | null = null;
    permissions: Permission[] = [];
    created_at?: string | null = null;
    updated_at?: string | null = null;
}