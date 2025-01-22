// axios-interceptors.ts
import axios from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();

const { handleResponse } = useUtils();

// Set the base URL for axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';  // Set your base URL here
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 20000;

// Request interceptor
axios.interceptors.request.use(
    (config) =>
    {
        const token = useStorage('token', null).value;
        if (token)
        {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>
    {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) =>
    {
        const { status, data } = response;
        const userStore = useUsersStore();
        if (status === 401) userStore.handleLogout();
        else handleResponse(data.statusCode, data);
        return response;
    },
    (error) =>
    {
        // Check if the error has a response (network errors won't have this)
        if (error.response)
        {
            const { status, data } = error.response;
            const userStore = useUsersStore();
            if (status === 401) userStore.handleLogout();
            else handleResponse(data.statusCode, data);
        } else
        {
            toast.error(`Network error: ${error.message || 'Please check your internet connection.'}`);
        }

        // Reject the promise so the calling function can handle the error if needed
        return Promise.reject(error);
    }
);
