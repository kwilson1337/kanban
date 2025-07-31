import { createBaseStatuses } from '@/server/models/StatusModel'

export const insertBaseProjectStatus = async (projectId: number) => {
    const result = await createBaseStatuses(projectId)

    return {
        data: result
    }
}