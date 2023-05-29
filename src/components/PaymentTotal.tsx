import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../utils/currency";
import ReportPaper from "./ReportPaper";

type Props = {
  total: number;
};

function PaymentTotal({ total }: Props) {
  return (
    <ReportPaper>
      <Typography fontWeight="bold">
        Total: {formatCurrency(total)} USD
      </Typography>
    </ReportPaper>
  );
}

export default PaymentTotal;
