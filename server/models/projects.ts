import { sql } from '~~/server/db';
import { Project } from '~/types/Project';
import { ResultSetHeader } from '@/types/ResultSetHeader'

export const fetchAllPerUser = async (id: number) => {
    const result = await sql({
        query: `SELECT * FROM projects WHERE userId=?`,
        values: [ id ]
    })
    return result as Project[];
}

export const fetchById = async (id: number) => {
    const result = await sql({
        query: `SELECT * FROM projects WHERE userId = ?`,
        values: [ id ]
    })

    return result as Project[]
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
        return await fetchById(result.insertId)
    }    

    return []
}