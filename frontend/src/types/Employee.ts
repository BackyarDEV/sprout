export interface Skill {
    id?: number;
    skillName: string;
}

export interface Employee {
    id: number;
    name: string;
    role: string;
    skills?: Skill[];
}
