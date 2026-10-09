import type {Employee, EmployeeRole, Team} from "../types/Employee";
import {useEffect, useState} from "react";
import {Box, Container, Paper, TextField} from "@mui/material";
import {employeeService} from "../services/employeeService.ts";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Typography from "@mui/material/Typography";
import {useAuth} from "../context/AuthContext";

export default function EmployeesPage() {
  // Commons
  const [employees, setEmployees] = useState<Employee[]>([]);
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

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
  const [role, setRole] = useState<EmployeeRole | undefined>(undefined);
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const addEmployee = async () => {

    await employeeService.createEmployee({
      name,
      role,
      team
    });

    await loadEmployees();

    setName("");
    setRole(undefined);
    setTeam(undefined);
  };

  //   delete Employee
  const deleteEmployee = async (id: number) => {

    await employeeService.deleteEmployee(id);

    await loadEmployees();
  };

  // Render
  return (

    <>
      <Typography component="div" variant="h3"  color="text.primary" gutterBottom sx={{py: 4, fontFamily: "monospace"}}>
        Manage Employees
      </Typography>
      <Container maxWidth="xs">

        <Paper square={false} elevation={4}>
          <Box sx={{p: 1, mb: 3, bgcolor: 'primary.main'}}>
            <TextField
              label="Search Employees"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Box>
        </Paper>

      </Container>
      <Container maxWidth="md">

        {isAdmin && (
          <Paper elevation={4}>
            <EmployeeForm
              name={name}
              role={role}
              team={team}
              onNameChange={setName}
              onRoleChange={setRole}
              onTeamChange={setTeam}
              onSubmit={addEmployee}
            />
          </Paper>
        )}

        <Paper elevation={4}>
          <EmployeeTable
            employees={filteredEmployees}
            onDelete={isAdmin ? deleteEmployee : undefined}
            onUpdateEmployee={
              isAdmin
                ? async (employeeId, employee) => {
                  await employeeService.updateEmployee(employeeId, employee);
                  await loadEmployees();
                }
                : undefined
            }
            onUpdateSkills={
              isAdmin
                ? async (employeeId, skills) => {
                  await employeeService.updateEmployeeSkills(
                    employeeId,
                    skills.map(skillName => ({skillName}))
                  );
                  await loadEmployees();
                }
                : undefined
            }
          />
        </Paper>

      </Container>
    </>
  );
}
