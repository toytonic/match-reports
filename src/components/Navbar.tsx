import { Box, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { ReactComponent as Apps } from "../assets/svg/apps-menu.svg";
import { ReactComponent as Stats } from "../assets/svg/charts.svg";
import { ReactComponent as Logout } from "../assets/svg/logout-menu.svg";
import { ReactComponent as Monitor } from "../assets/svg/monitor-menu.svg";
import { ReactComponent as Charts } from "../assets/svg/pie-charts-menu.svg";

function Navbar() {
  return (
    <Stack component="nav" spacing={2} sx={{ pr: 3 }}>
      <NavItem>
        <Stats />
      </NavItem>
      <NavItem>
        <Apps />
      </NavItem>
      <NavItem>
        <Monitor />
      </NavItem>
      <NavItem>
        <Charts />
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Stack>
  );
}

function NavItem({ children }: PropsWithChildren) {
  return (
    <Box component="a" href="#">
      {children}
    </Box>
  );
}

export default Navbar;
