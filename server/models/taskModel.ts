import { sql } from '~~/server/db';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import type { Task } from '~/types/Task'

export const fetchTasks = async (projectId: string | number) => {
    const tasks = await sql({
        query: `SELECT * FROM tasks WHERE projectId = ?`,
        values: [projectId]
    }) as Task[]

    return tasks
}

export const insertSingleTask = (projectId: string | number, task: {}) => {
    const insert = sql({
        query: `INSERT INTO tasks (taskName, taskDescription, statusId, projectId, taskOwner, dueDate)
                VALUES (?, ?, ?, ?, ?, ?)`,
        values: [task]
    })
}