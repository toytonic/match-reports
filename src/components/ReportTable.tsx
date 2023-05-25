import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { Gateways } from "../api/useGateways";
import { Projects } from "../api/useProjects";
import { Payment } from "../api/useReport";

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
  projects: Projects[];
  gateways: Gateways[];
  report: Payment[];
};

function ReportTable({ report, projects, gateways }: Props) {
  return (
    <>
      <Box>
        <Table>
          <TableHead>
            <TableCell>
              <Typography>Date</Typography>
            </TableCell>
            <TableCell>
              <Typography>Gateway</Typography>
            </TableCell>
            <TableCell>
              <Typography>Transaction ID</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Amount</Typography>
            </TableCell>
          </TableHead>
          {report.map(({ amount, created, gatewayId, paymentId }) => (
            <StyledTableRow>
              <TableCell>{created}</TableCell>
              <TableCell>{gatewayId}</TableCell>
              <TableCell>{paymentId}</TableCell>
              <TableCell align="right">{amount} USD</TableCell>
            </StyledTableRow>
          ))}
        </Table>
      </Box>
      <Box>
        <Typography>TOTAL: </Typography>
      </Box>
    </>
  );
}

export default ReportTable;
