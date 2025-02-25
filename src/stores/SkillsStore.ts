import { ApiResponse } from "@/Types/ApiResponse";
import { Skills } from "@/Types/Skills";
import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSkillsStore = defineStore('skills', () =>
{
    const skills = ref<Skills[]>([]);
    const skill = ref<Skills>(new Skills());

    async function fetchSkills(): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ skills: Skills[] }>> = await axios.get('/skills');
            const { success, statusCode, data } = response.data;
            if (success && statusCode === 200)
            {
                skills.value = [...data.skills];
            }
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                console.error('Error fetching skills:');
            }
        }
    }

    async function createSkill(skill: Skills): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ skill: Skills }>> = await axios.post('/skills', skill);
            const { data } = response.data;
            skills.value.push(data.skill);
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                throw error;
            }
        }
    }

    async function updateSkill(skillId: string, skill: Skills): Promise<void>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ skill: Skills }>> = await axios.put(`/skills/${skillId}`, skill);
            const { data } = response.data;
            const index = skills.value.findIndex(s => s.id === skillId);
            if (index !== -1)
            {
                skills.value[index] = data.skill;
            }
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                throw error;
            }
        }
    }

    async function deleteSkill(skillId: string): Promise<void>
    {
        try
        {
            await axios.delete(`/skills/${skillId}`);
            const index = skills.value.findIndex(s => s.id === skillId);
            if (index !== -1)
            {
                skills.value.splice(index, 1);
            }
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                throw error;
            }
        }
    }

    async function getSkillById(id: string): Promise<Skills>
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ skill: Skills }>> = await axios.get(`/skills/${id}`);
            const { data } = response.data;
            return data.skill;
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                throw error;
            }
            return new Skills();
        }
    }

    async function getSkillsByCategoryId(categoryId: string | null): Promise<Skills[]> 
    {
        try
        {
            const response: AxiosResponse<ApiResponse<{ skills: Skills[] }>> = await axios.get(`/get-skill-by-category/${categoryId}`);
            const { data } = response.data;
            skills.value = data.skills;
            return data.skills;
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                throw error;
            }
            return [];
        }
    }

    return {
        skills,
        skill,
        fetchSkills,
        createSkill,
        updateSkill,
        deleteSkill,
        getSkillsByCategoryId,
        getSkillById
    };
});
