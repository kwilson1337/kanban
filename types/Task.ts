export type Task = {
    id: number | string;
    statusId: number | string;
    projectId: number | string;
    taskName: string;
    taskDescription: string;
    taskOwner: number | string;
    dueDate: string | Date;
    createdDate: string;
    ordinal: string | number;
    isEditing?: boolean | string
    beenMoved?: boolean
}

export type TaskStatus = Pick<Task, 'id' | 'statusId' | 'ordinal'>;