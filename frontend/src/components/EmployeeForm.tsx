import {Button, MenuItem, Paper, Stack, TextField} from "@mui/material";
import type {EmployeeRole} from "../types/Employee.ts";
import {useEffect, useState} from "react";
import {employeeService} from "../services/employeeService.ts";

interface EmployeeFormProps {
  name: string;
  role: EmployeeRole | undefined;
  team: string;

  onNameChange: (value: string) => void;
  onRoleChange: (value: EmployeeRole | undefined) => void;
  onTeamChange: (value: string) => void;

  onSubmit: () => void;
}

export default function EmployeeForm({
                                       name,
                                       role,
                                       team,
                                       onNameChange,
                                       onRoleChange,
                                       onTeamChange,
                                       onSubmit
                                     }: EmployeeFormProps) {

  const isValid = name.trim().length >= 3 && team.trim().length >= 3;

  const roleMenuItemSx = {
    bgcolor: 'primary.dark',
    color: 'primary.contrastText',

    '&.Mui-selected': {
      bgcolor: 'secondary.main',
      color: 'secondary.contrastText',
    },

    '&.Mui-selected:hover': {
      bgcolor: 'secondary.main',
    },

    '&:hover': {
      bgcolor: 'action.hover',
    },
  };

  const slotProps = {
    select: {
      MenuProps: {
        slotProps: {
          paper: {
            sx: {
              maxHeight: 48 * 4,

              bgcolor: '#222',
              '& .MuiMenuItem-root': {
                color: '#fff',
              },
              '& .MuiMenuItem-root:hover': {
                bgcolor: '#333',
              },
              '& .Mui-selected': {
                bgcolor: '#444 !important',
              },
            },
          },
        },
      },
    },
  };

  const [roles, setRoles] = useState<EmployeeRole[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await employeeService.getEmployeeRoles();
        if (mounted) setRoles(list);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err : unknown) {
        // ignore
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.main' }}>

      <Stack spacing={3}>

        <TextField
          label="Employee Name"
          value={name}
          onChange={(e) =>
            onNameChange(e.target.value)
          }
          error={
            name.trim().length > 0 &&
            name.trim().length < 3
          }
          helperText={
            name.trim().length > 0 &&
            name.trim().length < 3
              ? "Minimum 3 characters"
              : ""
          }
          fullWidth></TextField>


        <TextField
          select
          value={role}
          onChange={(e) => {
            const selectedRole = roles.find(r => r.role === e.target.value);
            onRoleChange(selectedRole)
          }
        }
          sx={{ textAlign: 'left' }}
          slotProps={slotProps}
        >
          <MenuItem value="" sx={roleMenuItemSx}>Select Role</MenuItem>
          {roles.map(r => (
            <MenuItem key={r.id ?? r.role} value={r.role} sx={roleMenuItemSx}>
              {r.role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Team"
          value={team}
          onChange={(e) =>
            onTeamChange(e.target.value)
          }
          error={
            team.trim().length > 0 &&
            team.trim().length < 3
          }
          helperText={
            team.trim().length > 0 &&
            team.trim().length < 3
              ? "Minimum 3 characters"
              : ""
          }
          fullWidth
        />

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!isValid}
          color={"secondary"}
        >
          Add Employee
        </Button>

      </Stack>

    </Paper>
  );
}