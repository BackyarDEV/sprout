import { createTheme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode) =>
    createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        transition: 'background-color 250ms ease, color 250ms ease',
                    },
                    '#root': {
                        transition: 'background-color 250ms ease, color 250ms ease',
                    },
                    '.MuiAppBar-root, .MuiPaper-root, .MuiButton-root, .MuiIconButton-root, .MuiOutlinedInput-root, .MuiTypography-root': {
                        transition:
                            'background-color 250ms ease, color 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
                    },
                },
            },
        },
        palette: {
            mode,
            primary: {
                main: "#d6b708",
            },
        },
    });
