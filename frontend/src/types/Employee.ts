export interface Skill {
    id?: number;
    skillName: string;
}

export interface EmployeeRole {
    id?: number;
    role: string;
}

export interface Employee {
    id: number;
    name: string;
    role?: EmployeeRole;
    team: string;
    skills?: Skill[];
}
