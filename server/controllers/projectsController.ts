import { 
    post, 
    fetchAllPerUser, 
    fetchById 
} from '~/server/models/projectsModel'
import { H3Event } from 'h3';

export const createProject = async (event: H3Event) => {
    try {        
        const body = await readBody(event)               
        const result = await post(body)
                   
        return {
          data: result,
          statusCode: 200,
        };
    } catch(error) {
        throw createError({            
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }
}

export const fetchUserProjects = async (event: H3Event) => {
    try {
        const id = Number(getRouterParam(event, 'id'))
        const result = await fetchAllPerUser(id)
        
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

export const fetchProjectById = async (event: H3Event) => {
    try {
        const id = Number(getRouterParam(event, 'id'))                
        const result = await fetchById(id)                

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