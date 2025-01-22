export const can = () =>
{
    const userPermissions: any = useStorage('permissions', []).value;
    const hasPermission = (permission: string) =>
    {
        return userPermissions.includes(permission);
    }

    return { hasPermission }
}