import { ApiResponse } from "@/Types/ApiResponse";
import Role from "@/Types/Role";
import { AxiosError, AxiosResponse } from "axios";

export const useRolesStore = defineStore('role', () =>
{
    const roles = ref<Role[]>([])
    const role = ref<Role>(new Role());

    async function fetchRoles(name: string | null = null): Promise<void>
    {
        try
        {

            const response: AxiosResponse<ApiResponse<{ roles: Role[] }>> = await axios.get('/roles', { params: { name: name } });
            const { success, statusCode, data } = response.data;
            if (success && statusCode === 200)
                roles.value = [...data.roles]

        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                const axiosError = error as AxiosError<ApiResponse>;
                const { status } = axiosError
                console.log('axios errr', status)

            }
        }

    }

    async function createRole(role: Role): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ role: Role }>> = await axios.post('/roles', role);
            let { data } = response.data;
            roles.value.push(data.role);

        } catch (error)
        {

        }

    }

    async function updateRole(roleId: string, role: Role): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ role: Role }>> = await axios.put(`/roles/${roleId}`, role);
            let { data } = response.data;
            const index = roles.value.findIndex(p => p.id === role.id);
            roles.value[index] = data.role;

        } catch (error)
        {

        }

    }

    async function deleteRole(id: string)
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ role: Role }>> = await axios.delete(`/roles/${id}`);
            roles.value = roles.value.filter(role => role.id !== id);
        } catch (error)
        {
            console.error(error);
        }
    }

    async function getRoleById(id: number): Promise<Role | undefined>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ role: Role }>> = await axios.get(`/roles/${id}`);
            let { data } = response.data;
            role.value = data ? { ...data.role } : new Role();
            return role.value;
        } catch (error)
        {
            console.error(error);
        }
    }

    return {
        roles,
        role,
        fetchRoles,
        createRole,
        updateRole,
        getRoleById
    }

})