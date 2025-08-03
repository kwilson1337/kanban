import { sql } from '~~/server/db';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import type { Task } from '~/types/Task'

export const fetchTasks = async (projectId: string | number) => {
    const tasks = await sql({
        query: `SELECT * FROM tasks WHERE projectId = ? ORDER BY createdDate DESC`,
        values: [projectId]
    }) as Task[]

    return tasks
}

export const insertQuickTask = async (task: {}) => {    
    const quickTask = await sql({
        query: `INSERT INTO tasks (taskName, taskDescription, statusId, projectId, taskOwner, dueDate)
                VALUES (?, ?, ?, ?, ?, ?)`,
        values: [...Object.values(task)]
    }) as ResultSetHeader    
    
    if(quickTask.insertId) {
        return 'SUCCESS'
    }

    return 'ERROR'
}