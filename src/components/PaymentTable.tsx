import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Payment } from "../api/useReport";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";

const StyledTableRow = styled(TableRow)`
  td {
    border: none;
  }

  &:nth-of-type(odd) {
    background: ${({ theme }) => theme.palette.background.default};
  }

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`;

type Props = {
  payments: Payment[];
  showGateway?: boolean;
};

function PaymentTable({ payments, showGateway }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          {showGateway ? <TableCell>Gateway</TableCell> : null}
          <TableCell>Transaction ID</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map(({ amount, created, gatewayId, paymentId }) => (
          <StyledTableRow key={paymentId} data-cy={`payment-row-${paymentId}`}>
            <TableCell>{formatDate(created)}</TableCell>
            {showGateway ? <TableCell>{gatewayId}</TableCell> : null}
            <TableCell>{paymentId}</TableCell>
            <TableCell align="right">{formatCurrency(amount)} USD</TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PaymentTable;
