
import type { Task } from "~/types/Task"

export const useTasks = () => {
    const insertQuickTask = async (data: Task, projectId: string | number) => {
        const result = await $fetch(`/api/projects/${projectId}/task/quick-task`, {
            method: 'POST',
            body: data
        })

        console.log('result', result)
    }

    return {
        insertQuickTask
    }
}