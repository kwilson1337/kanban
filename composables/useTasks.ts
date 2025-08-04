
import type { Task, TaskStatus } from "~/types/Task"

export const useTasks = () => {
    const insertQuickTask = async (data: Task, projectId: string | number) => {
        const quickTask = await $fetch(`/api/projects/${projectId}/task/quick-task`, {
            method: 'POST',
            body: data
        })  
        
        return quickTask
    }

     const updateTaskStatus = async (data: TaskStatus[], projectId: string | number) => {
        console.log('data', data)
        const result = await $fetch(`/api/projects/${projectId}/task/update-tasks-status`, {
            method: 'POST',
            body: data
        })

        console.log('result', result)
    }

    return {
        insertQuickTask,
        updateTaskStatus
    }   
}