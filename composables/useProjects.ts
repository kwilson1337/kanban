import { userId } from "~/constants/user"
import { ref } from 'vue'
import type { Project } from "~/types/Project"

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

    const singleProject = ref<Project | null>(null)
    const fetchProjectById = async (id: number) => {                    
        const result = await $fetch(`/api/projects/${id}`)                
        singleProject.value = result?.data[0]
    }

    return {
        fetchProjects,
        createProject,
        allProjects,
        isLoadingProjects,
        fetchProjectById,
        singleProject
    }
}