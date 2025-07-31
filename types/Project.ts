import type { Status } from "./Status";

export type Project = {
    id: number;
    projectName: string;
    createdDate: string;
    userId: string;
    status: Status[]
}