import { ApiResponse } from "@/Types/ApiResponse";
import User from "@/Types/User";

import { useToast } from "vue-toastification";
export const useUtils = () =>
{

    const toast = useToast();

    function handleSuccess<T>(response: ApiResponse<T>): T
    {
        if (!response.success)
        {
            throw new Error(response.message || "An unknown error occurred.");
        }
        return response.data;
    }

    function handleResponse(status: number, data: any): void
    {
        if (data.message == null) return
        let message = data.message;

        switch (status)
        {
            case 200:
                message = `Success: ${message || 'The request was successful.'}`;
                break;
            case 201:
                message = `Success: ${message || 'The request was successful.'}`;
                break;
            case 400:
                message = `Bad Request: ${message || 'Invalid request data.'}`;
                break;
            case 401:
                message = `Unauthorized: ${message || 'You need to log in.'}`;
                break;
            case 403:
                message = `Forbidden: ${message || 'You do not have permission to access this resource.'}`;
                break;
            case 404:
                message = `Not Found: ${message || 'The requested resource was not found.'}`;
                break;
            case 500:
                message = `Server Error: ${message || 'An internal server error occurred.'}`;
                break;
            default:
                message = `Error: ${message}`;

        }

        if (status == 204) return
        if (status >= 200 && status < 300) toast.success(message);
        if (status >= 400 && status <= 500) toast.error(message);

    }

    const saveUserDataToLocalStorage = (userData: User, permissionsEnum: any = []) =>
    {
        const user = { ...userData };

        user.permissions = user.permissions.map(permission => permission.name);
        user.roles = user.roles.map(role => role.name);

        useLocalStorage('token', user.token);
        useLocalStorage('user', user);
        useLocalStorage('permissions', user.permissions);
        useLocalStorage('roles', user.roles);
        if (permissionsEnum)
            useLocalStorage('permissionsEnum', permissionsEnum);

        return user;
    }

    const useCleanObj = reactive =>
    {
        Object.keys(reactive).forEach(key =>
        {
            if (
                reactive[key] === null ||
                reactive[key] === undefined ||
                reactive[key] === '' ||
                reactive[key] === false ||
                reactive[key].length === 0
            )
            {
                delete reactive[key];
            }
        });
        return reactive;
    };

    return {
        handleSuccess,
        handleResponse,
        saveUserDataToLocalStorage,
        useCleanObj
    }
}