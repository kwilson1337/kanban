export type Task = {
    id: number | string;
    statusId: number | string;
    projectId: number | string;
    taskName: string;
    taskDescription: string;
    taskOwner: number | string;
}