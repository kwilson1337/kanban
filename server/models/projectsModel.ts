import { sql } from '~~/server/db';
import type { Project } from '~/types/Project';
import type { Status } from '~/types/Status';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import { createBaseStatuses } from '@/server/models/StatusModel'

export const fetchAllPerUser = async (id: number) => {
    const result = await sql({
        query: `SELECT * FROM projects WHERE userId=?`,
        values: [ id ]
    })
    return result as Project[];
}

export const fetchById = async (id: number) => {    
    const projectResult = await sql({
        query: `SELECT * FROM projects WHERE id = ?`,
        values: [ id ]
    }) as Project[]

    const projectId = projectResult[0].id    
    const statusResults = await sql({
        query: 'SELECT * from status WHERE projectId = ?',
        values: [ projectId ]
    }) as Status[]  

    const returnObj = {
        ...projectResult[0],
        status: statusResults
    }

    return returnObj
}

export const post = async (data: any) => {    
    const result = await sql({
        query: `INSERT INTO projects
        (        
            projectName,
            userId
        )
        VALUES
        (
            ?,
            ?
        )`,
        values: [ data.projectName, data.userId ]
    }) as ResultSetHeader

    if(result.insertId) {
        await createBaseStatuses(result.insertId)        
        return await fetchById(result.insertId)
    }    

    return []
}