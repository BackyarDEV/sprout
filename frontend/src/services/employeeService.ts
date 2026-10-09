import type {Employee, Skill, EmployeeRole, Team} from "../types/Employee";
import { apiFetch } from "./api";

const EMPLOYEES_URL = "/api/employees";
const ROLES_URL = "/api/roles";
const TEAMS_URL = "/api/teams";

export const employeeService = {

  // Employees
  async createEmployee(
    employee: Omit<Employee, "id">
  ): Promise<Employee> {

    const response = await apiFetch(
      EMPLOYEES_URL,
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

  async getEmployees(): Promise<Employee[]> {
    const response =
      await apiFetch(EMPLOYEES_URL);

    return response.json();
  },

  async getEmployeesByRoleId(roleId: number): Promise<Employee[]> {
    const response = await apiFetch(`${EMPLOYEES_URL}/role/${roleId}`);
    return response.json();
  },

  async updateEmployee(
    id: number,
    employee: Omit<Employee, "id">
  ): Promise<void> {

    await apiFetch(
      `${EMPLOYEES_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      }
    );
  },

  async deleteEmployee(
    id: number
  ): Promise<void> {

    await apiFetch(
      `${EMPLOYEES_URL}/${id}`,
      {
        method: "DELETE"
      }
    );
  },

  // Roles
  async createEmployeeRole(
    employeeRole: Omit<EmployeeRole, "id">
  ): Promise<EmployeeRole> {

    const response = await apiFetch(
      ROLES_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeRole)
      }
    );

    return response.json();
  },

  async getEmployeeRoles(): Promise<EmployeeRole[]> {
    const response = await apiFetch(ROLES_URL);
    return response.json();
  },

  async updateEmployeeRole(
    id: number,
    employeeRole: Omit<EmployeeRole, "id">
  ): Promise<void> {

    await apiFetch(
      `${ROLES_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeRole)
      }
    );
  },

  async deleteEmployeeRole(
    id: number
  ): Promise<void> {

    await apiFetch(
      `${ROLES_URL}/${id}`,
      {
        method: "DELETE"
      }
    );
  },

  // Teams
  async createTeam(
    team: Omit<Team, "id">
  ): Promise<Team> {
    const response = await apiFetch(TEAMS_URL, {
      method: "POST",
      body: JSON.stringify(team),
    });

    return response.json();
  },

  async getTeams(): Promise<Team[]> {
    const response = await apiFetch(TEAMS_URL);
    return response.json();
  },

  async updateTeam(
    id: number,
    team: Omit<Team, "id">
  ): Promise<void> {
    await apiFetch(`${TEAMS_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(team),
    });
  },

  async deleteTeam(
    id: number
  ): Promise<void> {

    await apiFetch(
      `${TEAMS_URL}/${id}`,
      {
        method: "DELETE"
      }
    );
  },

  // Employee Skills
  async updateEmployeeSkills(
    id: number,
    skills: Skill[]
  ): Promise<Employee> {
    const response = await apiFetch(
      `${EMPLOYEES_URL}/${id}/skills`,
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
