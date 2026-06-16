import {Container, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TeamsPage() {

  // Render
  return (

    <Container maxWidth="md">
      <Typography component="div" variant="h3"  color="text.primary" gutterBottom sx={{py: 4, fontFamily: "monospace"}}>
        Manage Teams
      </Typography>
      <Paper elevation={4} sx={{p: 4}}>
        This will soon have team management options, but for now it's just a placeholder page to show how the drawer navigation works.
        You can click on the "Employees" item in the drawer to see the Employees page, and click back here to see this Teams page.
      </Paper>
    </Container>

  );
}
