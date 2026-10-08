import type {Employee, Skill, EmployeeRole, Team} from "../types/Employee";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ??
//   `${window.location.protocol}//${window.location.hostname}:8490`;

// const EMPLOYEES_URL = new URL("/api/employees", API_BASE_URL).toString();
// const ROLES_URL = new URL("/api/roles", API_BASE_URL).toString();
// const TEAMS_URL = new URL("/api/teams", API_BASE_URL).toString();

const EMPLOYEES_URL = "/api/employees";
const ROLES_URL = "/api/roles";
const TEAMS_URL = "/api/teams";

export const employeeService = {

  // Employees
  async createEmployee(
    employee: Omit<Employee, "id">
  ): Promise<Employee> {

    const response = await fetch(
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
      await fetch(EMPLOYEES_URL);

    return response.json();
  },

  async getEmployeesByRoleId(roleId: number): Promise<Employee[]> {
    const response = await fetch(`${EMPLOYEES_URL}/role/${roleId}`);
    return response.json();
  },

  async updateEmployee(
    id: number,
    employee: Omit<Employee, "id">
  ): Promise<void> {

    await fetch(
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

    await fetch(
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

    const response = await fetch(
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
    const response = await fetch(ROLES_URL);
    return response.json();
  },

  async updateEmployeeRole(
    id: number,
    employeeRole: Omit<EmployeeRole, "id">
  ): Promise<void> {

    await fetch(
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

    await fetch(
      `${ROLES_URL}/${id}`,
      {
        method: "DELETE"
      }
    );
  },

  // Teams
  async createTeam(
    team: Omit<Team, "id">
  ): Promise<EmployeeRole> {

    const response = await fetch(
      ROLES_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
      }
    );

    return response.json();
  },

  async getTeams(): Promise<Team[]> {
    const response = await fetch(TEAMS_URL);
    return response.json();
  },

  // Teams
  async updateTeam(
    team: Omit<Team, "id">
  ): Promise<EmployeeRole> {

    const response = await fetch(
      ROLES_URL,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
      }
    );

    return response.json();
  },

  async deleteTeam(
    id: number
  ): Promise<void> {

    await fetch(
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
    const response = await fetch(
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
