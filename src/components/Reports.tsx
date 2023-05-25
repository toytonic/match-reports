import { Typography } from "@mui/material";
import FilterMenu from "./FilterMenu";

function Reports() {
  return (
    <>
      <Typography variant="h4">Reports</Typography>
      <Typography variant="h6" color="grey">
        Easily generate a report of your transactions
      </Typography>
      <FilterMenu onFilterSelect={console.log}></FilterMenu>
    </>
  );
}

export default Reports;
