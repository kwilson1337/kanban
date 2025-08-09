
import { result } from "lodash-es"
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
        await $fetch(`/api/projects/${projectId}/task/update-tasks-status`, {
            method: 'POST',
            body: data
        })        
    }

    const updateTask = async (task: Task) => {
        const result = await $fetch(`/api/task/${task.id}`, {
            method: 'POST',
            body: task
        })

        return result
    }

    const deleteTask = async (id: number) => {
        const result = await $fetch(`/api/task/${id}`, {
            method: 'DELETE'
        })

        return result
    }

    return {
        insertQuickTask,
        updateTaskStatus,
        updateTask,
        deleteTask
    }   
}