import { userId } from "~/constants/user"
import { ref } from 'vue'
import type { Project } from "~/types/Project"
import type { Status } from "~/types/Status"

export const useProjects = () => {
    const isLoadingProjects = ref(true)

    const allProjects = ref<Project[] | []>([])
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
    
    const fetchProjectById = async (id: number) => {                    
        const result = await $fetch(`/api/projects/${id}`)
        return result.data
    }

    const fetchProjectStatuses = async (projectId: number) => {
        const result = await $fetch(`/api/projects/${projectId}/status`)
        
        if(result) {
            return result
        }

        return []
    }

    const updateProjectStatus = async (
        statuses: Status[], 
        projectId: number | string
    ) => {
        await $fetch(`/api/projects/${projectId}/status/update`, {
            method: 'POST',
            body: {
                statuses                
            }
        })
    }

    return {
        fetchProjects,
        createProject,
        allProjects,
        isLoadingProjects,
        fetchProjectById,
        updateProjectStatus,
        fetchProjectStatuses
    }
}
