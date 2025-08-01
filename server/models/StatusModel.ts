import { sql } from '~~/server/db';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import { Status } from '~/types/Status';

export const createBaseStatuses = async (projectId: number) => {
    const displayNamesAndOrdinal = [
        {
            name: 'To do',
            ordinal: 1
        },
        {
            name: 'In progress',
            ordinal: 2
        },
        {
            name: 'Completed',
            ordinal: 3
        }
    ]

    const resultArray = [] as ResultSetHeader[]
    displayNamesAndOrdinal.forEach(async (obj) => {
        const result = await sql({
            query: ` INSERT INTO status
                    ( statusName, ordinal, projectId )
                    VALUES ( ?, ?, ? )`,
            values: [ obj.name, obj.ordinal, projectId ]
        }) as ResultSetHeader

        resultArray.push(result)
    })        
}

export const updateAndAdddNewProjectStatuses = async (
    statuses: Status[], 
    projectId: number | string
) => {    
    const filterOutCreateDate = statuses.map(status => ({
        id: status.id,
        statusName: status.statusName,
        ordinal: status.ordinal,
        projectId: status.projectId
    }))

    const insertValues = filterOutCreateDate.map(status => {
        return `('${status.statusName}', ${status.ordinal}, ${status.projectId})`
    })
                     
    const result = await sql({        
        query: `INSERT INTO status (statusName, ordinal, projectId)
                VALUES ${insertValues.join(', ')}                                    
                ON DUPLICATE KEY UPDATE
                    statusName = VALUES(statusName)`
    })

    console.log('result', result)    
}