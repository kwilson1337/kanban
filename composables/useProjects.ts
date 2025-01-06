import { userId } from "~/constants/user"
import { ref } from 'vue'
import type { Project } from "~/types/Project"

export const useProjects = () => {
    const isLoadingProjects = ref(false)

    const allProjects = ref<Project[]>([])
    const fetchProjects = async () => {
        isLoadingProjects.value = true
        
        const result = await $fetch(`/api/projects/user/${userId}`)
        allProjects.value = result?.data ?? []

        isLoadingProjects.value = false
    }

    const createProject = async (name: string, hasRefresh = true) => {
        await $fetch('/api/projects', {
            method: 'POST',
            body: {
                projectName: name,
                userId
            }      
        }) 

        if(hasRefresh) {
            await fetchProjects()
        }
    }

    return {
        fetchProjects,
        createProject,
        allProjects
    }
}