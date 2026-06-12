import {Button, Paper, Stack, TextField} from "@mui/material";

interface EmployeeFormProps {
  name: string;
  role: string;
  team: string;

  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
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
  const isValid =
    name.trim().length >= 3 &&
    role.trim().length >= 2 &&
    team.trim().length >= 3;

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
          value={role}
          onChange={(e) =>
            onRoleChange(e.target.value)
          }
          error={
            role.trim().length > 0 &&
            role.trim().length < 2
          }
          helperText={
            role.trim().length > 0 &&
            role.trim().length < 2
              ? "Minimum 2 characters"
              : ""
          }
          fullWidth
        />

        <TextField
          label="Team"
          value={team}
          onChange={(e) =>
            onTeamChange(e.target.value)
          }
          error={
            role.trim().length > 0 &&
            role.trim().length < 2
          }
          helperText={
            role.trim().length > 0 &&
            role.trim().length < 2
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