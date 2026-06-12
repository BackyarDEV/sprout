import { Box, Container, Typography, Link } from "@mui/material";
import type {JSX} from "react";

export default function SproutFooter(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        py: 10,
        mt: 20,
        bgcolor: "primary.main",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © {new Date().getFullYear()} Sprout
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Link href="/privacy">
            Privacy
          </Link>
          <Link href="/terms">
            Terms
          </Link>
          <Link href="/contact">
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
}