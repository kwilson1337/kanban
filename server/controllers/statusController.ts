import { 
    createBaseStatuses, 
    updateAndAdddNewProjectStatuses,
    fetchStatusByProjectId,
    updateStatusModel
 } from '~/server/models/statusModel'
import { H3Event } from 'h3';

export const insertBaseProjectStatus = async (projectId: number) => {
    const result = await createBaseStatuses(projectId)

    return {
        data: result
    }
}

export const fetchStatusForProject = async (event: H3Event) => {
    try {        
        const projectId = Number(getRouterParam(event, 'id'))
        const result = await fetchStatusByProjectId(projectId)

        return {
            data: result
        }
    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }
}

export const updateProjectStatuses = async (event: H3Event) => {
    try {
        const body = await readBody(event)
        const projectId = Number(getRouterParam(event, 'id'))
        const result = await updateAndAdddNewProjectStatuses(body.statuses, projectId)
        
        return {
            data: result,
            statusCode: 200,
        }
    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }
}

export const updateStatus = async (event: H3Event) => {
    try {
        const status = await readBody(event)
        const result = await updateStatusModel(status)

        if(result.affectedRows > 0) {
            return {
                data: result,
                statusCode: 200,
            }
        }        
    } catch(error) {        
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong'                        
        })
    }
}