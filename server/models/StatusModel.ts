import { sql } from '~~/server/db';
import { ResultSetHeader } from '@/types/ResultSetHeader'
import { Status } from '~/types/Status';
import { fetchTasks } from './taskModel';
import { Task } from '~/types/Task';

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

export const fetchStatusByProjectId = async (projectId : number | string) => {
    if(projectId) {
        const fetchStatus = await sql({
            query: `SELECT * FROM status WHERE projectId = ?`,
            values: [projectId]
        }) as Status[]

        /**
         * fetch tasks and bundle into 
         * status array by ID     
         */
        const tasks = await fetchTasks(projectId) as Task[]        
        if(tasks) {
            fetchStatus.forEach(status => {            
                status.tasks = tasks.filter(task => task.statusId === status.id)
            })
        }      
                      
        return fetchStatus
    }
}

export const updateAndAdddNewProjectStatuses = async (
    statuses: Status[], 
    projectId: number | string
) => {  
    const statusIds = statuses.map(status => status.id)        
    const foundRows = await sql({
        query: `SELECT id FROM status
                WHERE id IN (${statusIds.map(_ => '?').join(',')})
                AND projectId = ?`,
        values: [...statusIds, Number(projectId)]
    }) as Status[] 

    const foundIds = foundRows.map(item => item.id)
    const foundStatuses = statuses.filter(status => foundIds.includes(status.id))
    const newStatuses = statuses.filter(status => !foundIds.includes(status.id))
    const results = []

    if(foundStatuses.length) {
        const formatIdsAndNames = foundStatuses.map(status => {
            return `WHEN ${status.id} THEN '${status.statusName}'`
        })

        const updates = await sql({
            query: `UPDATE status
                    SET statusName = CASE id
                        ${formatIdsAndNames.join(' ')}                        
                        ELSE statusName 
                    END
                    WHERE id IN (${foundStatuses.map((status: Status) => status.id)})
                    AND projectId = ?`,
            values: [projectId]
        }) as ResultSetHeader

        if(updates.changedRows > 0) {
            results.push('SUCCESS')
        } else {
            results.push('FAIL')
        }
    }

    if(newStatuses.length) {
        const formatValues = newStatuses.map(status => {
            return `('${status.statusName}', ${status.ordinal}, ${status.projectId})`
        })
        
        const create = await sql({
            query: `INSERT INTO status (statusName, ordinal, projectId)
                    VALUES ${formatValues.join(', ')}`
        }) as ResultSetHeader

        if(create.changedRows > 0) {
            results.push('SUCCESS')
        } else {
            results.push('FAIL')
        }
    }

    return results
}