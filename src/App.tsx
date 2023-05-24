import { Box, Container, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container component="main" sx={{ py: 3, display: "flex" }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">Reports</Typography>
            <Typography variant="h6" color="grey">
              Easily generate a report of your transactions
            </Typography>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
