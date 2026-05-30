import type {Employee} from "../types/Employee";
import {useEffect, useState} from "react";
import {Box, Container, Stack, TextField, Typography} from "@mui/material";
import {employeeService} from "../services/employeeService.ts";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeEditDialog from "../components/EmployeeEditDialog";
import EmployeeForm from "../components/EmployeeForm";

export default function EmployeesPage() {
  // Commons
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Search
  const [search, setSearch] = useState("");
  const filteredEmployees = employees.filter(
    employee =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // fetch Employees
  const loadEmployees = async () => {
    const result =
      await employeeService.getEmployees();

    setEmployees(result);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEmployees();
  }, []);

  // add Employee
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const addEmployee = async () => {

    await employeeService.createEmployee({
      name,
      role
    });

    await loadEmployees();

    setName("");
    setRole("");
  };

  // Update Employee
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditName(employee.name);
    setEditRole(employee.role);
  };
  const saveEmployee = async () => {
    if (!editingEmployee) {
      return;
    }

    await employeeService.updateEmployee(
      editingEmployee.id,
      {
        name: editName, role: editRole
      }
    );
    await loadEmployees();

    setEditingEmployee(null);
  };

  // delete Employee
  const deleteEmployee = async (id: number) => {

    await employeeService.deleteEmployee(id);

    await loadEmployees();
  };

  // Render
  return (

    <Container maxWidth="md">
      <Typography
        variant="h3"
        gutterBottom
        sx={{mt: 4}}
      >
        Sprout Employee Management
      </Typography>

      <Box sx={{p: 3, mb: 3}}>
        <Stack spacing={3}>

          <TextField
            label="Search Employees"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

        </Stack>
      </Box>

      <EmployeeForm
        name={name}
        role={role}
        onNameChange={setName}
        onRoleChange={setRole}
        onSubmit={addEmployee}
      />

      <Box sx={{p: 3}}>
        <Stack spacing={3}>

          <EmployeeTable
            employees={filteredEmployees}
            onEdit={openEditDialog}
            onDelete={deleteEmployee}
          />

        </Stack>
      </Box>

      <EmployeeEditDialog
        open={editingEmployee !== null}
        editName={editName}
        editRole={editRole}
        onNameChange={setEditName}
        onRoleChange={setEditRole}
        onSave={saveEmployee}
        onClose={() => setEditingEmployee(null)}
      />

    </Container>

  );
}