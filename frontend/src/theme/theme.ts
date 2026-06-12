import { createTheme } from "@mui/material";
import type { Theme } from "@mui/material";

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
            MuiInputLabel: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        color: theme.palette.secondary.main,
                        '&.Mui-focused': {
                            color: theme.palette.secondary.main,
                        },
                    }),
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                        },
                    }),
                },
            },
            MuiLink: {
              styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }),
              }
            }
        },
        palette: (
            mode === 'light'
                ? {
                    mode,
                    primary: {
                        main: "#fef7f0",
                        contrastText: "#000000",
                    },
                    secondary: {
                        main: "#ff6b35",
                        contrastText: "#ffffff",
                    },
                    background: {
                        default: "#ffffff",
                        paper: "#ffffff",
                    },
                }
                : {
                    mode,
                    primary: {
                        main: "#2d1f0f",
                        contrastText: "#ffffff",
                    },
                    secondary: {
                        main: "#ff8c42",
                        contrastText: "#ffffff",
                    },
                    background: {
                        default: "#1a1a1a",
                        paper: "#1e1e1e",
                    },
                }
        ),
    });
