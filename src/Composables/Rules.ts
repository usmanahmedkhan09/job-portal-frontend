export const useRules = () =>
{
    const is_required = (value: string | number | boolean | unknown[] | null | undefined) =>
    {
        if (Array.isArray(value))
        {
            return value.length > 0 || 'This field is required'
        }
        return !!value || value === 0 || 'This field is required'
    }

    const is_email = (v: string) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) ||
        'E-mail must be valid';
    return { is_required, is_email }
}