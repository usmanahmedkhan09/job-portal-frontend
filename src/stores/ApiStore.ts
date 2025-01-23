import { defineStore } from "pinia";

export const useApiStore = defineStore('api', () =>
{
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    function startLoading(): void
    {
        loading.value = true;
    }

    function stopLoading(): void
    {
        loading.value = false;
    }

    function setError(message: string): void
    {
        error.value = message;
    }

    function clearError(): void
    {
        error.value = null;
    }

    return { loading, error, startLoading, stopLoading, setError, clearError };
})