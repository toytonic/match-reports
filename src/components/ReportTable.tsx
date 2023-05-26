import { Box, Typography } from "@mui/material";
import { Gateways } from "../api/useGateways";
import { Projects } from "../api/useProjects";
import { Payment } from "../api/useReport";
import PaymentTable from "./PaymentTable";
import { Fragment, useMemo, useState } from "react";
import { formatCurrency } from "../utils/currency";

type Props = {
  projects: Projects[];
  gateways: Gateways[];
  report: Payment[];
};

type GroupedReport = {
  [projectId: string]: {
    payments: Payment[];
    total: number;
  };
};

function ReportTable({ report, projects }: Props) {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  const groupedReport = useMemo(
    () =>
      report.reduce<GroupedReport>((acc, payment) => {
        const currentPayments = acc[payment.projectId]?.payments ?? [];
        const currentTotal = acc[payment.projectId]?.total ?? 0;

        acc[payment.projectId] = {
          payments: [...currentPayments, payment],
          total: currentTotal + payment.amount,
        };

        return acc;
      }, {}),
    [report]
  );

  const allTotal = report.reduce((acc, payment) => acc + payment.amount, 0);

  const toggleTableVisible = (id: string) =>
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  return (
    <>
      <Box
        sx={{
          mb: 2,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        {Object.keys(groupedReport).map((projectId) => {
          const group = groupedReport[projectId];
          const name = projects.find(
            (project) => project.projectId === projectId
          )?.name;

          return (
            <Box key={projectId} sx={{ mb: 2 }}>
              <Box
                onClick={() => toggleTableVisible(projectId)}
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
                  Total: {formatCurrency(group.total)} USD
                </Typography>
              </Box>
              {visibleIds.includes(projectId) ? (
                <PaymentTable payments={group.payments} />
              ) : null}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography fontWeight="bold">
          Total: {formatCurrency(allTotal)} USD
        </Typography>
      </Box>
    </>
  );
}

export default ReportTable;
