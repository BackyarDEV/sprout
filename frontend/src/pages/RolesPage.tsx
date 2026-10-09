import {Fragment, useEffect, useState} from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import type {Employee, EmployeeRole} from "../types/Employee";
import {employeeService} from "../services/employeeService";
import {useAuth} from "../context/AuthContext";

export default function RolesPage() {
  const [roles, setRoles] = useState<EmployeeRole[]>([]);
  const [role, setRole] = useState("");
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [editingRole, setEditingRole] = useState("");
  const [expandedRoleIds, setExpandedRoleIds] = useState<Set<number>>(new Set());
  const [employeesByRoleId, setEmployeesByRoleId] = useState<Record<number, Employee[]>>({});
  const [loadingRoleIds, setLoadingRoleIds] = useState<Set<number>>(new Set());
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const loadRoles = async () => {
    const result = await employeeService.getEmployeeRoles();
    setRoles(result);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRoles();
  }, []);

  const addRole = async () => {
    const trimmedRole = role.trim();

    if (trimmedRole.length < 3) {
      return;
    }

    await employeeService.createEmployeeRole({role: trimmedRole});
    await loadRoles();
    setRole("");
  };

  const isRoleValid = role.trim().length >= 3;
  const isEditingRoleValid = editingRole.trim().length >= 3;

  const beginRoleEdit = (employeeRole: EmployeeRole) => {
    if (employeeRole.id === undefined) {
      return;
    }

    setEditingRoleId(employeeRole.id);
    setEditingRole(employeeRole.role);
  };

  const cancelRoleEdit = () => {
    setEditingRoleId(null);
    setEditingRole("");
  };

  const saveRoleEdit = async (employeeRole: EmployeeRole) => {
    if (employeeRole.id === undefined || !isEditingRoleValid) {
      return;
    }

    await employeeService.updateEmployeeRole(employeeRole.id, {role: editingRole.trim()});
    await loadRoles();
    cancelRoleEdit();
  };

  const deleteRole = async (employeeRole: EmployeeRole) => {
    if (employeeRole.id === undefined) {
      return;
    }

    await employeeService.deleteEmployeeRole(employeeRole.id);
    await loadRoles();
  };

  const toggleRoleEmployees = async (employeeRole: EmployeeRole) => {
    if (employeeRole.id === undefined) {
      return;
    }

    const roleId = employeeRole.id;
    const isExpanded = expandedRoleIds.has(roleId);

    setExpandedRoleIds(current => {
      const next = new Set(current);
      if (isExpanded) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });

    if (isExpanded || employeesByRoleId[roleId] !== undefined) {
      return;
    }

    setLoadingRoleIds(current => new Set(current).add(roleId));
    try {
      const employees = await employeeService.getEmployeesByRoleId(roleId);
      setEmployeesByRoleId(current => ({...current, [roleId]: employees}));
    } finally {
      setLoadingRoleIds(current => {
        const next = new Set(current);
        next.delete(roleId);
        return next;
      });
    }
  };

  return (
    <>
      <Typography component="div" variant="h3" color="text.primary" gutterBottom sx={{py: 4, fontFamily: "monospace"}}>
        Manage Roles
      </Typography>

      <Container maxWidth="md">
        {isAdmin && (
          <Paper elevation={4}>
            <Paper elevation={0} sx={{p: 3, mb: 3, bgcolor: "primary.main"}}>
              <Stack spacing={3}>
                <TextField
                  label="Role Name"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  error={role.trim().length > 0 && !isRoleValid}
                  helperText={role.trim().length > 0 && !isRoleValid ? "Minimum 3 characters" : ""}
                  fullWidth
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addRole}
                  disabled={!isRoleValid}
                >
                  Add Role
                </Button>
              </Stack>
            </Paper>
          </Paper>
        )}

        <Paper elevation={4}>
          <TableContainer>
            <Table aria-label="roles">
              <TableHead>
                <TableRow>
                  <TableCell sx={{width: 56}} />
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map(employeeRole => {
                  const roleId = employeeRole.id;
                  const isExpanded = roleId !== undefined && expandedRoleIds.has(roleId);
                  const isLoading = roleId !== undefined && loadingRoleIds.has(roleId);
                  const employees = roleId === undefined ? [] : employeesByRoleId[roleId];

                  return (
                  <Fragment key={employeeRole.id ?? employeeRole.role}>
                    <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        aria-label={isExpanded ? `Collapse employees with ${employeeRole.role} role` : `Expand employees with ${employeeRole.role} role`}
                        aria-expanded={isExpanded}
                        onClick={() => void toggleRoleEmployees(employeeRole)}
                        disabled={roleId === undefined}
                      >
                        <ExpandMoreIcon sx={{transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease"}} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {editingRoleId === employeeRole.id ? (
                        <TextField
                          aria-label="Role name"
                          value={editingRole}
                          onChange={(event) => setEditingRole(event.target.value)}
                          error={editingRole.trim().length > 0 && !isEditingRoleValid}
                          helperText={editingRole.trim().length > 0 && !isEditingRoleValid ? "Minimum 3 characters" : ""}
                          size="small"
                          autoFocus
                        />
                      ) : employeeRole.role}
                    </TableCell>
                      <TableCell align="center">
                        {isAdmin && (
                          editingRoleId === employeeRole.id ? (
                            <>
                              <IconButton
                                size="small"
                                aria-label="Save role changes"
                                onClick={() => void saveRoleEdit(employeeRole)}
                                disabled={!isEditingRoleValid}
                              >
                                <CheckIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                aria-label="Cancel role changes"
                                onClick={cancelRoleEdit}
                              >
                                <CloseIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                size="small"
                                aria-label="Edit role"
                                onClick={() => beginRoleEdit(employeeRole)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                aria-label="Delete role"
                                onClick={() => void deleteRole(employeeRole)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} sx={{py: 0}}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{px: 3, py: 2, bgcolor: "background.default"}}>
                            <Typography variant="subtitle2" gutterBottom>
                              Employees assigned to {employeeRole.role}
                            </Typography>
                            {isLoading ? (
                              <CircularProgress size={20} aria-label="Loading employees" />
                            ) : employees?.length ? (
                              <Stack spacing={0.5}>
                                {employees.map(employee => (
                                  <Typography key={employee.id} variant="body2">
                                    {employee.name}{employee.team?.team ? ` — ${employee.team.team}` : ""}
                                  </Typography>
                                ))}
                              </Stack>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                No employees are assigned to this role.
                              </Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                  );
                })}
                {roles.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      <Box component="span" color="text.secondary">No roles have been added yet.</Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
