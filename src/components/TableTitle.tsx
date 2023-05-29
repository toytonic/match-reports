import { Typography } from "@mui/material";
import { Gateways } from "../api/useGateways";
import { Projects } from "../api/useProjects";
import { Params } from "../api/useReport";

type Props = {
  projects: Projects[];
  gateways: Gateways[];
  filter: Params;
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
