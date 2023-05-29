import { Box, Typography } from "@mui/material";
import { ReactComponent as Dashboard } from "../assets/svg/dashboard.svg";

function Empty() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5">No reports</Typography>
      <Typography
        align="center"
        sx={{ color: "text.secondary", mb: 3, width: "60%" }}
      >
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </Typography>
      <Dashboard />
    </Box>
  );
}

export default Empty;
