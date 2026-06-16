import type {Employee, Skill, EmployeeRole, Team} from "../types/Employee";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  `${window.location.protocol}//${window.location.hostname}:8490`;

const BASE_URL = new URL("/api/employees", API_BASE_URL).toString();
const ROLES_URL = new URL("/api/roles", API_BASE_URL).toString();
const TEAMS_URL = new URL("/api/teams", API_BASE_URL).toString();

export const employeeService = {

  async getEmployees(): Promise<Employee[]> {
    const response =
      await fetch(BASE_URL);

    return response.json();
  },

  async createEmployee(
    employee: Omit<Employee, "id">
  ): Promise<Employee> {

    const response = await fetch(
      BASE_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      }
    );

    return response.json();
  },
  async deleteEmployee(
    id: number
  ): Promise<void> {

    await fetch(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE"
      }
    );
  },
  async updateEmployee(
    id: number,
    employee: Omit<Employee, "id">
  ): Promise<void> {

    await fetch(
      `${BASE_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      }
    );
  },

  async getEmployeeRoles(): Promise<EmployeeRole[]> {
    const response = await fetch(ROLES_URL);
    return response.json();
  },

  async getTeams(): Promise<Team[]> {
    const response = await fetch(TEAMS_URL);
    return response.json();
  },

  async updateEmployeeSkills(
    id: number,
    skills: Skill[]
  ): Promise<Employee> {
    const response = await fetch(
      `${BASE_URL}/${id}/skills`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(skills)
      }
    );

    return response.json();
  },


};
