import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../utils/currency";
import { useState } from "react";
import PaymentTable from "./PaymentTable";
import { Payment } from "../api/useReport";

type Props = {
  name: string;
  payments: Payment[];
  total: number;
};

function PaymentGroup({ name, payments, total }: Props) {
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
      >
        <Typography fontWeight="bold">{name}</Typography>
        <Typography fontWeight="bold" sx={{ ml: "auto" }}>
          Total: {formatCurrency(total)} USD
        </Typography>
      </Box>
      {open ? <PaymentTable payments={payments} showGateway={true} /> : null}
    </Box>
  );
}

export default PaymentGroup;
