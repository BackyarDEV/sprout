export interface Skill {
    id?: number;
    skillName: string;
}

export interface Team {
    id?: number;
    team: string;
}

export interface EmployeeRole {
    id?: number;
    role: string;
}

export interface Employee {
    id: number;
    name: string;
    role?: EmployeeRole;
    team?: Team;
    skills?: Skill[];
}
