import { useMemo } from "react";
import { Gateway } from "../api/useGateways";
import { Project } from "../api/useProjects";
import { FilterParams, Payment } from "../api/useReport";
import PaymentGroup from "./PaymentGroup";
import PaymentTotal from "./PaymentTotal";
import ReportPaper from "./ReportPaper";
import TableTitle from "./TableTitle";

type Props = {
  projects: Project[];
  gateways: Gateway[];
  payments: Payment[];
  filter: FilterParams;
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
              key={projectId}
              name={name ?? ""}
              payments={group.payments}
              total={group.total}
              showGateway={true}
            />
          );
        })}
      </ReportPaper>
      <PaymentTotal total={allTotal} />
    </>
  );
}

export default ReportTable;
