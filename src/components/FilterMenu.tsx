import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Gateway } from "../api/useGateways";
import { Project } from "../api/useProjects";
import { FilterParams } from "../api/useReport";
import { maxDate, minDate } from "../constants";
import DateFilter from "./DateFilter";
import ListFilter from "./ListFilter";

type Filter = FilterParams;

type Props = {
  projects: Project[];
  gateways: Gateway[];
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
        value={filter.from ?? minDate}
        onSelect={(value) =>
          handleFilterSelect({
            from: value,
            to: dayjs(filter.to).isBefore(value) ? value : filter.to,
          })
        }
      />
      <DateFilter
        label="To date"
        value={filter.to ?? maxDate}
        onSelect={(value) =>
          handleFilterSelect({
            to: value,
            from: dayjs(filter.from).isAfter(value) ? value : filter.from,
          })
        }
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => onGenerate(filter)}
      >
        Generate Report
      </Button>
    </Stack>
  );
}

export default FilterMenu;
