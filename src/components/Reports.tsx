import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Gateway, useGateways } from "../api/useGateways";
import { Project, useProjects } from "../api/useProjects";
import { FilterParams, Payment, useReport } from "../api/useReport";
import Empty from "./Empty";
import FilterMenu from "./FilterMenu";
import PaymentTable from "./PaymentTable";
import PaymentTotal from "./PaymentTotal";
import ProjectGatewayTable from "./ProjectGatewayTable";
import ReportTable from "./ReportTable";
import TableTitle from "./TableTitle";

type Filter = FilterParams;

type Props = {
  gateways: Gateway[];
  projects: Project[];
  payments: Payment[];
  filter: Filter;
};

function Reports() {
  const [filter, setFilter] = useState<Filter>({});
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();
  const { data: payments, isLoading: isPaymentsLoading } = useReport(filter);

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography component="h1" variant="h5">
            Reports
          </Typography>
          <Typography component="h2" color="text.secondary">
            Easily generate a report of your transactions
          </Typography>
        </Box>

        {gateways && projects ? (
          <FilterMenu
            gateways={gateways}
            projects={projects}
            onGenerate={setFilter}
          />
        ) : null}
      </Box>

      {isPaymentsLoading ? (
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={30} />
          <Skeleton variant="rounded" height={30} />
          <Skeleton variant="rounded" height={30} />
        </Stack>
      ) : payments?.length && gateways && projects ? (
        <TableSwitch
          payments={payments}
          gateways={gateways}
          projects={projects}
          filter={filter}
        />
      ) : (
        <Empty />
      )}
    </>
  );
}

function TableSwitch({ gateways, projects, payments, filter }: Props) {
  if (filter.projectId && filter.gatewayId) {
    const total = payments.reduce((acc, payment) => acc + payment.amount, 0);

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
          <TableTitle projects={projects} gateways={gateways} filter={filter} />
          <PaymentTable payments={payments} />
        </Box>
        <PaymentTotal total={total} />
      </>
    );
  }

  if (filter.projectId || filter.gatewayId) {
    return (
      <ProjectGatewayTable
        payments={payments}
        filter={filter}
        gateways={gateways}
        projects={projects}
      />
    );
  }

  return (
    <ReportTable
      payments={payments}
      gateways={gateways}
      projects={projects}
      filter={filter}
    />
  );
}

export default Reports;
