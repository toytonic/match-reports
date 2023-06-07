import { Unstable_Grid2 as Grid } from "@mui/material";
import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Gateway } from "../api/useGateways";
import { Project } from "../api/useProjects";
import { FilterParams, Payment } from "../api/useReport";
import PaymentGroup from "./PaymentGroup";
import PaymentTotal from "./PaymentTotal";
import ReportPaper from "./ReportPaper";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

type Props = {
  filter: FilterParams;
  gateways: Gateway[];
  projects: Project[];
  payments: Payment[];
};

type GroupedPayments = {
  [gatewayId: string]: {
    payments: Payment[];
    total: number;
  };
};

const getName = ({
  id,
  projects,
  gateways,
}: {
  id: string;
  projects: Project[];
  gateways: Gateway[];
}) =>
  projects.find((project) => project.projectId === id)?.name ??
  gateways.find((gateway) => gateway.gatewayId === id)?.name;

function ProjectGatewayTable({ payments, projects, gateways, filter }: Props) {
  const id = filter.projectId ?? filter.gatewayId;
  const filterKey = filter.projectId ? "projectId" : "gatewayId";
  const groupIdKey = filter.projectId ? "gatewayId" : "projectId";

  const groupedPayments = useMemo(
    () =>
      payments.reduce<GroupedPayments>((acc, payment) => {
        if (id === payment[filterKey]) {
          const currentPayments = acc[payment[groupIdKey]]?.payments ?? [];
          const currentTotal = acc[payment[groupIdKey]]?.total ?? 0;

          acc[payment[groupIdKey]] = {
            payments: [...currentPayments, payment],
            total: currentTotal + payment.amount,
          };
        }

        return acc;
      }, {}),
    [payments, id, groupIdKey, filterKey]
  );

  const total = useMemo(
    () => payments.reduce((acc, payment) => acc + payment.amount, 0),
    [payments]
  );

  const chartData = useMemo(
    () => ({
      labels: Object.keys(groupedPayments).map((id) =>
        getName({ id, projects, gateways })
      ),
      datasets: [
        {
          data: Object.keys(groupedPayments).map((id) =>
            Math.round((groupedPayments[id].total / total) * 100)
          ),
        },
      ],
    }),
    [gateways, groupedPayments, projects, total]
  );

  return (
    <Grid container columnSpacing={2}>
      <Grid xs={6}>
        <ReportPaper>
          {Object.keys(groupedPayments).map((id) => {
            const group = groupedPayments[id];

            return (
              <PaymentGroup
                key={id}
                name={getName({ id, projects, gateways }) ?? ""}
                total={group.total}
                payments={group.payments}
              />
            );
          })}
        </ReportPaper>
      </Grid>
      <Grid xs={6}>
        <ReportPaper>
          <Doughnut data={chartData} options={{ maintainAspectRatio: true }} />
        </ReportPaper>
        <PaymentTotal total={total} />
      </Grid>
    </Grid>
  );
}

export default ProjectGatewayTable;
