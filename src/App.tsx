import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="header">
        <Typography> Header</Typography>
      </Box>
      <Box component="main">
        <Typography>Main</Typography>
      </Box>
      <Box component="footer">
        <Typography>Footer</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
