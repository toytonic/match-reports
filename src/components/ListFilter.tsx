import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  label: string;
  items?: { label: string; id: string }[];
  onSelect: (id: string | null) => void;
};

function ListFilter({ label, items, onSelect }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
        color="secondary"
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => onSelect(null)}>All</MenuItem>
        {items?.map(({ id, label }) => (
          <MenuItem key={id} onClick={() => onSelect(id)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}

export default ListFilter;
