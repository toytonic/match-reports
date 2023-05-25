import { Button, Stack } from "@mui/material";
import ListFilter from "./ListFilter";
import { useGateways } from "../api/useGateways";
import { useProjects } from "../api/useProjects";
import { useMemo } from "react";

type Props = {
  onFilterSelect: () => void;
};

function FilterMenu({ onFilterSelect }: Props) {
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();

  const projectFilter = useMemo(
    () => projects?.map(({ projectId: id, name: label }) => ({ id, label })),
    [projects]
  );

  const gateWayFilter = useMemo(
    () => gateways?.map(({ gatewayId: id, name: label }) => ({ id, label })),
    [gateways]
  );

  return (
    <Stack direction="row" spacing={1}>
      <ListFilter
        label="Projects"
        items={projectFilter}
        onSelect={console.log}
      />
      <ListFilter
        label="Gateways"
        items={gateWayFilter}
        onSelect={console.log}
      />
      <Button variant="contained">Generate Report</Button>
    </Stack>
  );
}

export default FilterMenu;
