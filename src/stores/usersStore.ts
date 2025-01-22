import { ApiResponse } from "@/Types/ApiResponse";
import User from "@/Types/User";
import { AxiosResponse } from "axios";
import { useRouter } from "vue-router";


type Filters = {
  email: string;
  name: string;
};


export const useUsersStore = defineStore('user', () =>
{
  const users = ref<User[]>([])
  const user = ref<User>(new User());
  const isAuthenticated = ref(false);
  const router = useRouter();

  const { saveUserDataToLocalStorage } = useUtils();

  const userPermissions: any = computed(() =>
  {
    return user.value.permissions;
  });


  async function getCsrfToken(): Promise<string>
  {
    const response = await axios.get('sanctum/csrf-cookie');
    return response.data;
  }

  async function handleLogin(email: string, password: string): Promise<void>
  {
    const response = await axios.post<ApiResponse<{ user: User, permissionsEnum: [] }>>('login', { email, password });
    const { success, statusCode, data } = response.data;
    user.value = { ...data.user };
    user.value = saveUserDataToLocalStorage(user.value, data.permissionsEnum);
    if (success && statusCode === 200)
      router.push('/dashboard');

  }

  async function handleLogout(): Promise<void>
  {
    await axios.post('logout');
    user.value = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');

  }

  async function fetchUsers(user: Filters): Promise<void>
  {
    const response = await axios.get<ApiResponse<{ data: User[] }>>('/user', { params: { ...user } });
    const { success, statusCode, data } = response.data;
    if (success && statusCode === 200)
      users.value = [...data.data]

  }

  async function addUser(user: User): Promise<void>
  {

    const response = await axios.post<ApiResponse<{ user: User }>>('/user', user);
    let { data } = response.data;
    users.value.push(data.user);

  };

  async function deleteUser(id: string)
  {
    const response: AxiosResponse<ApiResponse<{ user: User }>> = await axios.delete(`/users/${id}`);
    users.value = users.value.filter(user => user.id !== id);

  };

  async function updateUser(id: string, updatedUser: User): Promise<void>
  {
    const response = await axios.put<ApiResponse<{ user: User }>>(`/user/${id}`, updatedUser);
    let { data } = response.data;
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.id === data.user.id)
    {
      localStorage.removeItem('permissions');
      user.value = saveUserDataToLocalStorage(data.user);
    }
  };

  async function getUserById(id: number): Promise<User | undefined> 
  {

    const response = await axios.get<ApiResponse<{ user: User }>>(`/user/${id}/edit`);
    const { data } = response.data;
    user.value = data ? { ...data.user } : new User();
    user.value.permissions = data.user.permissions.map(permission => permission.name);
    user.value.roles = data.user.roles.map(role => role.name);
    return JSON.parse(JSON.stringify(user.value))

  };

  return { user, users, isAuthenticated, userPermissions, fetchUsers, getCsrfToken, handleLogin, handleLogout, getUserById, addUser, updateUser, deleteUser }
})
