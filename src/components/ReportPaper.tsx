import { Box, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ sx?: SxProps }>;

function ReportPaper({ children, sx = {} }: Props) {
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ReportPaper;
