import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#005B96",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#1BC5BD",
      contrastText: "#FFF",
    },
    divider: "#F3F6F9",
    text: {
      primary: "#011F4B",
    },
    background: {
      default: "#FFF",
      paper: "#F1FAFE",
    },
  },
});

export { theme };
