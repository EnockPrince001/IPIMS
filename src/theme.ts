import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// MUI theme settings
export const themeSettings = (mode: "dark" | "light"): ThemeOptions => {
    return {
        palette: {
            mode: mode,
            primary: {
                main: "hsl(142.1, 76.2%, 36.3%)", // Primary Green from Tailwind
                contrastText: "#fff",
            },
            secondary: {
                main: "hsl(142.1, 70.6%, 45.3%)",
            },
            background: {
                default: mode === "dark" ? "hsl(222.2, 84%, 4.9%)" : "hsl(210, 20%, 98%)",
                paper: mode === "dark" ? "hsl(222.2, 84%, 4.9%)" : "#ffffff",
            },
            text: {
                primary: mode === "dark" ? "hsl(210, 40%, 98%)" : "hsl(224, 71.4%, 4.1%)",
                secondary: mode === "dark" ? "hsl(215, 20.2%, 65.1%)" : "hsl(215.4, 16.3%, 46.9%)",
            },
            divider: mode === "dark" ? "hsl(217.2, 32.6%, 17.5%)" : "hsl(214.3, 31.8%, 91.4%)",
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
                fontWeight: 700,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
                fontWeight: 700,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
                fontWeight: 600,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
                fontWeight: 600,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
                fontWeight: 500,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
                fontWeight: 500,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        borderRadius: "12px",
                    },
                },
            },
        },
    };
};

// Context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState<"dark" | "light">("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode] as const;
};

