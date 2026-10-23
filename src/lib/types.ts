export interface Project {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    // completed_at: string;
    // created_at: string
}

export interface Projects {
    projects: Project[];
}