import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { ReactComponent as LogoSvg } from "../assets/svg/logo.svg";
import { ReactComponent as NavToggleSvg } from "../assets/svg/nav-toggle.svg";

function Header() {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }} component="header">
      <Container sx={{ display: "flex", alignItems: "center", height: 80 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <LogoSvg />
          <NavToggleSvg />
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: 2,
            width: 43,
            height: 43,
            borderRadius: 1,
            backgroundColor: "#F6CA65",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="primary.contrastText">
            JD
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">John Doe</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
