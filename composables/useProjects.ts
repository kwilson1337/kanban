import { userId } from "~/constants/user"
import { ref } from 'vue'
import type { Project } from "~/types/Project"
import { useRouter } from "vue-router"

export const useProjects = () => {
    const isLoadingProjects = ref(true)
    const router = useRouter()

    const allProjects = ref<Project[] | []>([])
    const fetchProjects = async () => {
        isLoadingProjects.value = true
        
        const result = await $fetch(`/api/projects/user/${userId}`)
        allProjects.value = result?.data ?? []

        isLoadingProjects.value = false
    }

    const createProject = async (name: string, hasRefresh = true) => {
        const { data } = await $fetch('/api/projects', {
            method: 'POST',
            body: {
                projectName: name,
                userId
            }      
        }) 
     
        if(hasRefresh) {
            await fetchProjects()
        } else {            
            router.push({
                path: `/project/${data.id}`
            })
        }
    }
    
    const fetchProjectById = async (id: number) => {                    
        const result = await $fetch(`/api/projects/${id}`)
        return result.data
    }

    const updateProjectName = async (projectName: Partial<Project>, projectId: number) => {
        const result = await $fetch(`/api/projects/${projectId}`, {
            method: 'POST',
            body: projectName
        })

        return result
    }
       
    return {
        fetchProjects,
        createProject,
        allProjects,
        isLoadingProjects,
        fetchProjectById,
        updateProjectName   
    }
}
