import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

interface EmployeeEditDialogProps {
  open: boolean;
  editName: string;
  editRole: string;

  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;

  onSave: () => void;
  onClose: () => void;
}

export default function EmployeeEditDialog({
                                             open,
                                             editName,
                                             editRole,
                                             onNameChange,
                                             onRoleChange,
                                             onSave,
                                             onClose
                                           }: EmployeeEditDialogProps) {
  const isValid =
    editName.trim().length >= 3 &&
    editRole.trim().length >= 2;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Edit Employee
      </DialogTitle>

      <DialogContent>

        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >

          <TextField
            label="Name"
            value={editName}
            onChange={(e) =>
              onNameChange(e.target.value)
            }
            error={
              editName.trim().length > 0 &&
              editName.trim().length < 3
            }
            helperText={
              editName.trim().length > 0 &&
              editName.trim().length < 3
                ? "Minimum 3 characters"
                : ""
            }
          />

          <TextField
            label="Role"
            value={editRole}
            onChange={(e) =>
              onRoleChange(e.target.value)
            }
            error={
              editRole.trim().length > 0 &&
              editRole.trim().length < 2
            }
            helperText={
              editRole.trim().length > 0 &&
              editRole.trim().length < 2
                ? "Minimum 5 characters"
                : ""
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={!isValid}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}