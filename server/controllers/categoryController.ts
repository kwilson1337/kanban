import type { Category } from "~/types/Category";
import { H3Event } from 'h3';
import {
    fetchTaskCategoriesModel
} from '@/server/models/categoriesModel'

export const fetchTaskCategories = async (event: H3Event) => {
    try {
        const taskId = Number(getRouterParam(event, 'id'))

        const results = await fetchTaskCategoriesModel(taskId) as Category[]        
        return {
            data: results,
            statusCode: 200
        }
    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }
}