import { defineStore } from 'pinia'
import type { Project } from '~/types/Project'

export const useProjectStore = defineStore('projectStore', () => {
    
    const projectList = ref<Project[]>([])   
    const setProjectList = (projects : any) => {        
        projectList.value = projects
    }

    return {
        setProjectList,
        projectList
    }

})