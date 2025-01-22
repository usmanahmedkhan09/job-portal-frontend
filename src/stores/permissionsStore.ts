import { ApiResponse } from "@/Types/ApiResponse";
import Permission from "@/Types/Permission";
import { AxiosError, AxiosResponse } from "axios";

export const usePermissionsStore = defineStore('permissions', () =>
{
    const permissions = ref<Permission[]>([])
    const permission = ref<Permission>(new Permission());

    async function fetchPermissions(name: string | null = null): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ permissions: Permission[] }>> = await axios.get('/permissions', { params: { name: name } });
            const { success, statusCode, data } = response.data;
            if (success && statusCode === 200)
                permissions.value = [...data.permissions]

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

    async function createPermission(permission: Permission): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ permission: Permission }>> = await axios.post('/permissions', permission);
            let { data } = response.data;
            permissions.value.push(data.permission);

        } catch (error)
        {

        }

    }

    async function updatePermission(permissionId: string, permission: Permission): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ permission: Permission }>> = await axios.put(`/permissions/${permissionId}`, permission);
            let { data } = response.data;
            const index = permissions.value.findIndex(p => p.id === permission.id);
            permissions.value[index] = data.permission;

        } catch (error)
        {

        }

    }

    async function deletePermission(permissionId: string): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ permission: Permission }>> = await axios.delete(`/permissions/${permissionId}`);
            permissions.value = permissions.value.filter(p => p.id !== permissionId);

        } catch (error)
        {

        }

    }

    async function getPermissionById(permissionId: number): Promise<Permission | undefined>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ permission: Permission }>> = await axios.get(`/permissions/${permissionId}`);
            let { data } = response.data;
            permission.value = data ? { ...data.permission } : new Permission();
            return permission.value;
        } catch (error)
        {
            console.error(error);
        }
    }

    return {
        permissions,
        permission,
        fetchPermissions,
        createPermission,
        updatePermission,
        getPermissionById
    }
})