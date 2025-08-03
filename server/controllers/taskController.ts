import { insertQuickTask } from "../models/taskModel"
import { H3Event } from 'h3';

export const createQuickTask = async (event: H3Event) => {
    try {        
        const task = await readBody(event)
        const result = await insertQuickTask(task)

        return {
            data: result,
            statusCode: 200
        }
    } catch(error) {
        console.error(error)
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong',            
        })
    }
}