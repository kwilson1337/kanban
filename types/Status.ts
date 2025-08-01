import type { Task } from "./Task";

export type Status = {
    id: number | string;
    statusName: string;
    ordinal: string | number;
    createdDate: string;
    projectId: number | string;
    tasks: Task[] | []
}
