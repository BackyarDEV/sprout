import type {Employee} from "../types/Employee";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  `${window.location.protocol}//${window.location.hostname}:8490`;

const BASE_URL = new URL("/api/employees", API_BASE_URL).toString();

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


};
