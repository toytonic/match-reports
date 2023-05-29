import { Box, Typography } from "@mui/material";
import FilterMenu from "./FilterMenu";
import { Params, useReport, Payment } from "../api/useReport";
import { Gateways, useGateways } from "../api/useGateways";
import { Projects, useProjects } from "../api/useProjects";
import { useState } from "react";
import ReportTable from "./ReportTable";
import PaymentTable from "./PaymentTable";
import TableTitle from "./TableTitle";
import PaymentTotal from "./PaymentTotal";
import ProjectTable from "./ProjectTable";
import Empty from "./Empty";

type Filter = Params;

type Props = {
  gateways: Gateways[];
  projects: Projects[];
  payments: Payment[];
  filter: Filter;
};

function TableSwitch({ gateways, projects, payments, filter }: Props) {
  if (filter.projectId && filter.gatewayId) {
    //TODO: move to component?
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

  if (filter.projectId && !filter.gatewayId) {
    return (
      <ProjectTable
        payments={payments}
        projectId={filter.projectId}
        groupIdKey="projectId"
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

function Reports() {
  const [filter, setFilter] = useState<Filter>({});
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();
  const { data: payments } = useReport(filter);
  const isFiltersLoaded = gateways && projects;
  const isDataLoaded = isFiltersLoaded && payments;

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <Typography variant="h6" color="text.secondary">
          Easily generate a report of your transactions
        </Typography>

        {isFiltersLoaded ? (
          <FilterMenu
            gateways={gateways}
            projects={projects}
            onGenerate={setFilter}
          />
        ) : null}
      </Box>

      {isDataLoaded && payments.length ? (
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

export default Reports;
