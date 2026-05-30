import type {Employee} from "../types/Employee";
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({
                                        employees,
                                        onEdit,
                                        onDelete
                                      }: EmployeeTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
              >
                No employees found
              </TableCell>
            </TableRow>
          ) : (
            employees.map(employee => (
              <TableRow key={employee.id}>

                <TableCell>
                  {employee.name}
                </TableCell>

                <TableCell>
                  {employee.role}
                </TableCell>

                <TableCell>

                  <Stack
                    direction="row"
                    spacing={1}
                  >

                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        onEdit(employee)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        onDelete(employee.id)
                      }
                    >
                      Delete
                    </Button>

                  </Stack>

                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
}