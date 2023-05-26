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

const minDate = "2021-01-01";
const maxDate = "2021-12-31";

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
        value={filter.from}
        onSelect={(value) =>
          handleFilterSelect({ from: value, to: filter.to ?? maxDate })
        }
      />
      <DateFilter
        label="To date"
        value={filter.to}
        onSelect={(value) =>
          handleFilterSelect({ to: value, from: filter.from ?? minDate })
        }
      />
      <Button variant="contained" onClick={() => onGenerate(filter)}>
        Generate Report
      </Button>
    </Stack>
  );
}

export default FilterMenu;
