import {Button, MenuItem, Paper, Stack, TextField} from "@mui/material";
import type {EmployeeRole, Team} from "../types/Employee.ts";
import {useEffect, useState} from "react";
import {employeeService} from "../services/employeeService.ts";

interface EmployeeFormProps {
  name: string;
  role: EmployeeRole | undefined;
  team: Team | undefined;

  onNameChange: (value: string) => void;
  onRoleChange: (value: EmployeeRole | undefined) => void;
  onTeamChange: (value: Team | undefined) => void;

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

  const isValid = name.trim().length >= 3;

  const menuItemSx = {
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

              bgcolor: 'primary.main',
              '& .MuiMenuItem-root': {
                color: 'primary.contrastText',
              },
              '& .MuiMenuItem-root:hover': {
                bgcolor: 'primary.darker',
              },
              '& .Mui-selected': {
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText'
              },
            },
          },
        },
      },
    },
  };

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await employeeService.getTeams();
        if (mounted) setTeams(list);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err : unknown) {
        console.error('err occurred while fetching teams');
      }
    })();

    return () => { mounted = false; };
  }, []);

  const [roles, setRoles] = useState<EmployeeRole[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await employeeService.getEmployeeRoles();
        if (mounted) setRoles(list);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err : unknown) {
        console.error('err occurred while fetching employee roles');
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
          label="Role"
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
          <MenuItem value="" sx={menuItemSx}>Select Role</MenuItem>
          {roles.map(r => (
            <MenuItem key={r.id ?? r.role} value={r.role} sx={menuItemSx}>
              {r.role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Team"
          select
          value={team}
          onChange={(e) => {
            const selectedTeam = teams.find(t => t.team === e.target.value);
            onTeamChange(selectedTeam)
          }
          }
          sx={{ textAlign: 'left' }}
          slotProps={slotProps}
        >
          <MenuItem value="" sx={menuItemSx}>Select Team</MenuItem>
          {teams.map(t => (
            <MenuItem key={t.id ?? t.team} value={t.team} sx={menuItemSx}>
              {t.team}
            </MenuItem>
          ))}
        </TextField>

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