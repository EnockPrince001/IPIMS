import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
        greenAccent: Palette["primary"];
        redAccent: Palette["primary"];
        blueAccent: Palette["primary"];
    }

    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        greenAccent?: PaletteOptions["primary"];
        redAccent?: PaletteOptions["primary"];
        blueAccent?: PaletteOptions["primary"];
    }
}
