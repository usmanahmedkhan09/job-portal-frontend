


function routerGuard(router: any)
{
    router.beforeEach((to: any, from: any, next: any) =>
    {
        const token = useStorage('token', null).value
        if (to.meta.requiresAuth && !token)
        {
            return next('/home'); // Redirect unauthenticated users
        }

        if (token && to.path === '/login')
        {
            return next('/dashboard'); // Redirect logged-in users away from login
        }

        next(); // Allow navigation

    })
}

export default routerGuard