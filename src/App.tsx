import { Container, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container component="main">
        <Typography>Main</Typography>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
