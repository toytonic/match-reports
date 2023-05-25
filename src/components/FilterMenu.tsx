import { Button, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { Gateways } from "../api/useGateways";
import { Projects } from "../api/useProjects";
import DateFilter from "./DateFilter";
import ListFilter from "./ListFilter";
import { Params } from "../api/useReport";

type Filter = Params;

type Props = {
  projects: Projects[];
  gateways: Gateways[];
  onGenerate: (filter: Filter) => void;
};

function FilterMenu({ onGenerate, projects, gateways }: Props) {
  const [filter, setFilter] = useState<Filter>({});

  const projectFilter = useMemo(
    () => projects?.map(({ projectId: id, name: label }) => ({ id, label })),
    [projects]
  );

  const gatewayFilter = useMemo(
    () => gateways?.map(({ gatewayId: id, name: label }) => ({ id, label })),
    [gateways]
  );

  const handleFilterSelect = (selectedFilter: Partial<Filter>) => {
    setFilter({ ...filter, ...selectedFilter });
  };

  return (
    <Stack direction="row" spacing={1}>
      <ListFilter
        label="All Projects"
        items={projectFilter}
        value={filter.projectId}
        onSelect={(value) => handleFilterSelect({ projectId: value })}
      />
      <ListFilter
        label="All Gateways"
        items={gatewayFilter}
        value={filter.gatewayId}
        onSelect={(value) => handleFilterSelect({ gatewayId: value })}
      />
      <DateFilter
        label="From date"
        onSelect={(value) => handleFilterSelect({ from: value })}
      />
      <DateFilter
        label="To date"
        onSelect={(value) => handleFilterSelect({ to: value })}
      />
      <Button variant="contained" onClick={() => onGenerate(filter)}>
        Generate Report
      </Button>
    </Stack>
  );
}

export default FilterMenu;
