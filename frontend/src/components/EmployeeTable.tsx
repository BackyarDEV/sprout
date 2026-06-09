import type {Employee} from "../types/Employee";
import {Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

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
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Actions</TableCell>
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
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Edit
                      </Box>
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        onDelete(employee.id)
                      }
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Delete
                      </Box>
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
