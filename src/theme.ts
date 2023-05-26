import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#005B96",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1BC5BD",
      contrastText: "#fff",
    },
    divider: "#F3F6F9",
    text: {
      primary: "#011F4B",
    },
    background: {
      default: "#fff",
      paper: "#F1FAFE",
    },
  },
});

export { theme };
