import { H3Event } from 'h3';
import { fetchUserById } from '@/server/models/users'

export const fetchUserFromId = async (event: H3Event) => {
    try {
        const id = Number(getRouterParam(event, 'id'))        
        const result = await fetchUserById(id)
        
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