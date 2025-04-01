// axios-interceptors.ts
import axios from 'axios';
import { useToast } from "vue-toastification";
var toast = useToast();
var handleResponse = useUtils().handleResponse;
// Set the base URL for axios
axios.defaults.withCredentials = true;
// In production, this will be rewritten by the Netlify proxy
// In development, you may need to point to your local API
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 20000;
// Request interceptor
axios.interceptors.request.use(function (config)
{
    var token = useStorage('token', null).value;
    if (token)
    {
        config.headers['Authorization'] = "Bearer ".concat(token);
    }
    return config;
}, function (error)
{
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response)
{
    var status = response.status, data = response.data;
    var userStore = useUsersStore();
    if (status === 401)
        userStore.handleLogout();
    else
        handleResponse(data.statusCode, data);
    return response;
}, function (error)
{
    // Check if the error has a response (network errors won't have this)
    if (error.response)
    {
        var _a = error.response, status_1 = _a.status, data = _a.data;
        var userStore = useUsersStore();
        if (status_1 === 401)
            userStore.handleLogout();
        else
            handleResponse(data.statusCode, data);
    }
    else
    {
        toast.error("Network error: ".concat(error.message || 'Please check your internet connection.'));
    }
    // Reject the promise so the calling function can handle the error if needed
    return Promise.reject(error);
});
