import { createBaseStatuses, updateAndAdddNewProjectStatuses } from '@/server/models/StatusModel'
import { Status } from '~/types/Status'
import { H3Event } from 'h3';

export const insertBaseProjectStatus = async (projectId: number) => {
    const result = await createBaseStatuses(projectId)

    return {
        data: result
    }
}

export const updateProjectStatuses = async (event: H3Event) => {
    const body = await readBody(event)
    const projectId = Number(getRouterParam(event, 'id'))

    const result = await updateAndAdddNewProjectStatuses(body.statuses, projectId)
  
    return {
        data: result
    }
}