import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens
export const tokens = (mode: "dark" | "light") => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#4d4d4d",
                700: "#333333",
                800: "#1a1a1a",
                900: "#0d0d0d", // Darker background
            },
            primary: {
                100: "#d0f0c0", // Tea Green (Very Light)
                200: "#a1e5a5", // Pastel Green
                300: "#72da8a", // Light Emerald
                400: "#43cf6f", // Emerald
                500: "#14c454", // Malachite (Main Green Img 1)
                600: "#109d43",
                700: "#0c7632",
                800: "#084e21",
                900: "#042711",
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebdd",
                300: "#94e2cc",
                400: "#70d8bb",
                500: "#4cceac", // Tealish Green
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1f5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8d7da",
                200: "#f1aeb5",
                300: "#ea868f",
                400: "#e35d6a",
                500: "#dc3545", // Standard Red
                600: "#b02a37",
                700: "#841f29",
                800: "#58151c",
                900: "#2c0b0e",
            },
            blueAccent: {
                100: "#e7f5ff",
                200: "#d0ebff",
                300: "#a5d8ff",
                400: "#74c0fc",
                500: "#339af0", // Friendly Blue
                600: "#228be6",
                700: "#1c7ed6",
                800: "#1971c2",
                900: "#1864ab",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#042711",
                200: "#084e21",
                300: "#0c7632",
                400: "#109d43",
                500: "#14c454", // Malachite (Main Green Img 1)
                600: "#43cf6f",
                700: "#72da8a",
                800: "#a1e5a5",
                900: "#d0f0c0",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1f5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bb",
                700: "#94e2cc",
                800: "#b7ebdd",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c0b0e",
                200: "#58151c",
                300: "#841f29",
                400: "#b02a37",
                500: "#dc3545",
                600: "#e35d6a",
                700: "#ea868f",
                800: "#f1aeb5",
                900: "#f8d7da",
            },
            blueAccent: {
                100: "#1864ab",
                200: "#1971c2",
                300: "#1c7ed6",
                400: "#228be6",
                500: "#339af0",
                600: "#74c0fc",
                700: "#a5d8ff",
                800: "#d0ebff",
                900: "#e7f5ff",
            },
        }),
});

// MUI theme settings
export const themeSettings = (mode: "dark" | "light") => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // Dark Mode Palette
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.grey[900],
                        paper: colors.grey[800],
                    },
                }
                : {
                    // Light Mode Palette
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc", // Ultra light grey/white for clean look
                        paper: "#ffffff",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
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
