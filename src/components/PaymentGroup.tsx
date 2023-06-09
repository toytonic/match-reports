import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Payment } from "../api/useReport";
import { formatCurrency } from "../utils/currency";
import PaymentTable from "./PaymentTable";

type Props = {
  name: string;
  payments: Payment[];
  total: number;
  showGateway?: boolean;
  testId?: string;
};

function PaymentGroup({ name, payments, total, showGateway, testId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          display: "flex",
          cursor: "pointer",
          backgroundColor: "background.default",
          borderRadius: 2,
          p: 2,
        }}
        data-cy={testId}
      >
        <Typography fontWeight="bold">{name}</Typography>
        <Typography fontWeight="bold" sx={{ ml: "auto" }}>
          Total: {formatCurrency(total)} USD
        </Typography>
      </Box>
      {open ? (
        <PaymentTable payments={payments} showGateway={showGateway} />
      ) : null}
    </Box>
  );
}

export default PaymentGroup;
