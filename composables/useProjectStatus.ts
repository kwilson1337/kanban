import type { Status } from "~/types/Status"

export const useProjectStatus = () => {
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
        updateProjectStatus,
        fetchProjectStatuses 
    }
}