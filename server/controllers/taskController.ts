import { 
    insertQuickTask, 
    updateTaskStatusModel, 
    updateTaskDetailsModel,
    deleteTaskModel
} from "../models/taskModel"
import { H3Event } from 'h3';

export const createQuickTask = async (event: H3Event) => {
    try {        
        const task = await readBody(event)
        const result = await insertQuickTask(task)
        
        return {
            data: result?.length ? result[0] : result,
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

export const updateTaskStatus = async (event: H3Event) => {
    try {
        const projectId = Number(getRouterParam(event, 'id'))
        const task = await readBody(event)
        const results = await updateTaskStatusModel(task, projectId)        

        if(results.changedRows > 0) {
            return {
                statusCode: 200
            }
        }
    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong',            
        })
    }
}

export const updateTaskDetails = async (event: H3Event) => {
    try {
        const task = await readBody(event)
        const results = await updateTaskDetailsModel(task)

        if(results.changedRows > 0) {
            return {
                statusCode: 200,                
                statusMessage: 'Task has been updated'
            }
        }
    }catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong',                    
        })
    }
}

export const deleteTask = async (event: H3Event) => {
    try {
        const taskId = Number(getRouterParam(event, 'id'))
        const result = await deleteTaskModel(taskId)

        if(result.affectedRows > 0) {
            return {
                statusCode: 200,
                data: result
            }
        }

    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong',                    
        })
    }
}