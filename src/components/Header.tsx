import { Box, Container, Typography } from "@mui/material";
import { ReactComponent as LogoSvg } from "../assets/svg/logo.svg";
import { ReactComponent as NavToggleSvg } from "../assets/svg/nav-toggle.svg";
import { useAuthContext } from "../auth/AuthProvider";

function Header() {
  const { user } = useAuthContext();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }} component="header">
      <Container
        sx={{ display: "flex", alignItems: "center", height: 80 }}
        maxWidth={false}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <LogoSvg />
          <NavToggleSvg />
        </Box>
        {user ? (
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                mr: 2,
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
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </Typography>
            </Box>
            <Typography fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}

export default Header;
