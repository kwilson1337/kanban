import { sql } from '~~/server/db';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import type { Task, TaskStatus } from '~/types/Task'

export const fetchTasks = async (projectId: string | number) => {
    const tasks = await sql({
        query: `SELECT * FROM tasks WHERE projectId = ? ORDER BY ordinal ASC`,
        values: [projectId]
    }) as Task[]

    return tasks
}

const fetchTaskById = async (taskId: string | number) => {
    const tasks = await sql({
        query: `SELECT * FROM tasks WHERE id = ?`,
        values: [taskId]
    }) as Task[]

    if(tasks.length) {
        return tasks
    }
}

export const insertQuickTask = async (task: {}) => {    
    const quickTask = await sql({
        query: `INSERT INTO tasks (taskName, taskDescription, statusId, projectId, taskOwner, dueDate, ordinal)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values: [...Object.values(task)]
    }) as ResultSetHeader    
    
    if(quickTask.insertId) {                
        return await fetchTaskById(quickTask.insertId)
    }

    return 'ERROR'
}

export const updateTaskStatusModel = async (tasks: TaskStatus[], projectId: string | number) => {        
    const formatStatusId = tasks.map(task => {
        return `WHEN ${task.id} THEN '${task.statusId}'`
    })
    const formatOrdinal = tasks.map(task => {
        return `WHEN ${task.id} THEN '${task.ordinal}'`
    })  
    const updates = await sql({
        query: `UPDATE tasks
                SET 
                statusId = CASE id
                    ${formatStatusId.join(' ')}                        
                    ELSE statusId 
                END,
                ordinal = CASE id
                    ${formatOrdinal.join(' ')}                        
                    ELSE ordinal 
                END
                WHERE id IN (${tasks.map((task) => task.id)})
                AND projectId = ?`,
        values: [projectId]
    }) as ResultSetHeader

    return updates
}