import { sql } from '~~/server/db';
import type { Category } from '~/types/Category';

export const fetchTaskCategoriesModel = async (taskId: number) => {
    const results = await sql({
        query: `SELECT * FROM categories 
                WHERE taskId = ?`,
        values: [taskId]
    }) as Category[]
    
    return results
}