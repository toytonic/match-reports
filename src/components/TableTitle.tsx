import { Typography } from "@mui/material";
import { Gateway } from "../api/useGateways";
import { Project } from "../api/useProjects";
import { FilterParams } from "../api/useReport";

type Props = {
  projects: Project[];
  gateways: Gateway[];
  filter: FilterParams;
};

function TableTitle({ projects, gateways, filter }: Props) {
  const projectName =
    projects.find(({ projectId }) => projectId === filter.projectId)?.name ??
    "All projects";

  const gatewayName =
    gateways.find(({ gatewayId }) => gatewayId === filter.gatewayId)?.name ??
    "All gateways";

  return (
    <Typography fontWeight="bold" mb={2}>
      {projectName} | {gatewayName}
    </Typography>
  );
}

export default TableTitle;
