import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

export default function UnknownPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Typography component="div" variant="h3" color="text.primary" gutterBottom sx={{ py: 4, fontFamily: "monospace" }}>
        Page Not Found
      </Typography>

      <Container maxWidth="sm">
        <Typography component="p">
          The requested URL "{location.pathname}" does not exist.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/")}>Go to Home</Button>
          <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </Box>
      </Container>
    </>
  );
}
