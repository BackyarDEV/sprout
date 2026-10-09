import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import type {Team} from "../types/Employee";
import {employeeService} from "../services/employeeService";
import {useAuth} from "../context/AuthContext";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const loadTeams = async () => {
    const result = await employeeService.getTeams();
    setTeams(result);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTeams();
  }, []);

  const addTeam = async () => {
    const trimmedTeam = team.trim();
    if (trimmedTeam.length < 3) return;

    setLoading(true);
    try {
      await employeeService.createTeam({team: trimmedTeam});
      await loadTeams();
      setTeam("");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamToDelete: Team) => {
    if (teamToDelete.id === undefined) return;

    await employeeService.deleteTeam(teamToDelete.id);
    await loadTeams();
  };

  const isTeamValid = team.trim().length >= 3;

  return (
    <>
      <Typography
        component="div"
        variant="h3"
        color="text.primary"
        gutterBottom
        sx={{py: 4, fontFamily: "monospace"}}
      >
        Manage Teams
      </Typography>

      <Container maxWidth="md">
        {isAdmin && (
          <Paper elevation={4} sx={{p: 3, mb: 3, bgcolor: "primary.main"}}>
            <Stack spacing={3}>
              <TextField
                label="Team Name"
                value={team}
                onChange={(event) => setTeam(event.target.value)}
                error={team.trim().length > 0 && !isTeamValid}
                helperText={
                  team.trim().length > 0 && !isTeamValid
                    ? "Minimum 3 characters"
                    : ""
                }
                fullWidth
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => void addTeam()}
                disabled={!isTeamValid || loading}
              >
                {loading ? "Adding..." : "Add Team"}
              </Button>
            </Stack>
          </Paper>
        )}

        <Paper elevation={4}>
          <TableContainer>
            <Table aria-label="teams">
              <TableHead>
                <TableRow>
                  <TableCell>Team</TableCell>
                  {isAdmin && <TableCell align="center">Actions</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {teams.map((item) => (
                  <TableRow key={item.id ?? item.team}>
                    <TableCell>{item.team}</TableCell>
                    {isAdmin && (
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          aria-label={`Delete ${item.team}`}
                          disabled={item.id === undefined}
                          onClick={() => void deleteTeam(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}

                {teams.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={isAdmin ? 2 : 1}>
                      <Box component="span" color="text.secondary">
                        No teams have been added yet.
                      </Box>
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