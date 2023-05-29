import { Unstable_Grid2 as Grid } from "@mui/material";
import { useMemo } from "react";
import { Payment } from "../api/useReport";
import PaymentGroup from "./PaymentGroup";
import PaymentTotal from "./PaymentTotal";
import ReportPaper from "./ReportPaper";

type PaymentGroupId = "projectId" | "gatewayId";

type Props = {
  projectId: string;
  groupIdKey: PaymentGroupId;
  payments: Payment[];
};

type GroupedPayments = {
  [gatewayId: string]: {
    payments: Payment[];
    total: number;
  };
};

function ProjectTable({ payments, projectId }: Props) {
  const groupedPayments = useMemo(
    () =>
      payments.reduce<GroupedPayments>((acc, payment) => {
        if (projectId !== payment.projectId) {
          return acc;
        }

        const currentPayments = acc[payment.gatewayId]?.payments ?? [];
        const currentTotal = acc[payment.gatewayId]?.total ?? 0;

        acc[payment.gatewayId] = {
          payments: [...currentPayments, payment],
          total: currentTotal + payment.amount,
        };

        return acc;
      }, {}),
    [payments, projectId]
  );

  const total = payments.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <Grid container columnSpacing={2}>
      <Grid xs={6}>
        <ReportPaper>
          {Object.keys(groupedPayments).map((id) => {
            const group = groupedPayments[id];

            return (
              <PaymentGroup
                key={id}
                name={id}
                total={group.total}
                payments={group.payments}
              />
            );
          })}
        </ReportPaper>
      </Grid>
      <Grid xs={6}>
        <PaymentTotal total={total} />
      </Grid>
    </Grid>
  );
}

export default ProjectTable;
