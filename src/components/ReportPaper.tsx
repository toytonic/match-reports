import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

function ReportPaper({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default ReportPaper;
