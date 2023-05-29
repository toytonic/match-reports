import { Box } from "@mui/material";
import { useMemo } from "react";
import { Gateways } from "../api/useGateways";
import { Projects } from "../api/useProjects";
import { Params, Payment } from "../api/useReport";
import PaymentGroup from "./PaymentGroup";
import PaymentTotal from "./PaymentTotal";
import TableTitle from "./TableTitle";
import ReportPaper from "./ReportPaper";

type Props = {
  projects: Projects[];
  gateways: Gateways[];
  payments: Payment[];
  filter: Params;
};

type GroupedReport = {
  [projectId: string]: {
    payments: Payment[];
    total: number;
  };
};

function ReportTable({ payments, projects, gateways, filter }: Props) {
  const groupedReport = useMemo(
    () =>
      payments.reduce<GroupedReport>((acc, payment) => {
        const currentPayments = acc[payment.projectId]?.payments ?? [];
        const currentTotal = acc[payment.projectId]?.total ?? 0;

        acc[payment.projectId] = {
          payments: [...currentPayments, payment],
          total: currentTotal + payment.amount,
        };

        return acc;
      }, {}),
    [payments]
  );

  const allTotal = payments.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <>
      <ReportPaper>
        <TableTitle projects={projects} gateways={gateways} filter={filter} />

        {Object.keys(groupedReport).map((projectId) => {
          const group = groupedReport[projectId];
          const name = projects.find(
            (project) => project.projectId === projectId
          )?.name;

          return (
            <PaymentGroup
              name={name ?? ""}
              payments={group.payments}
              total={group.total}
            />
          );
        })}
      </ReportPaper>
      <PaymentTotal total={allTotal} />
    </>
  );
}

export default ReportTable;
