import { Box, Typography } from "@mui/material";
import FilterMenu from "./FilterMenu";
import { Params, useReport } from "../api/useReport";
import { useGateways } from "../api/useGateways";
import { useProjects } from "../api/useProjects";
import { useState } from "react";
import ReportTable from "./ReportTable";

type Filter = Params;

function Reports() {
  const [filter, setFilter] = useState<Filter>({});
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();

  const { data: report } = useReport(filter);
  const isFiltersLoaded = gateways && projects;

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

      {isFiltersLoaded && report ? (
        <ReportTable report={report} gateways={gateways} projects={projects} />
      ) : null}
    </>
  );
}

export default Reports;
