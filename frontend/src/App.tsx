import {CssBaseline, ThemeProvider} from "@mui/material";

import {darkTheme} from "./theme/theme";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <EmployeesPage />

    </ThemeProvider>
  );
}

export default App;