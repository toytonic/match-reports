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
};

function PaymentTable({ payments }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Gateway</TableCell>
          <TableCell>Transaction ID</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments
          //   .sort((a, b) =>
          //     a.created < b.created ? 1 : a.created > b.created ? -1 : 0
          //   )
          .map(({ amount, created, gatewayId, paymentId }) => (
            <StyledTableRow key={paymentId}>
              <TableCell>{formatDate(created)}</TableCell>
              <TableCell>{gatewayId}</TableCell>
              <TableCell>{paymentId}</TableCell>
              <TableCell align="right">{formatCurrency(amount)} USD</TableCell>
            </StyledTableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default PaymentTable;
