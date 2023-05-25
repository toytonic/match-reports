import { Box, Button, Menu, MenuItem, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  label: string;
  value?: string;
  items?: { label: string; id: string }[];
  onSelect: (id: string | null) => void;
};

function ListFilter({ label, items, onSelect, value }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedLabel = useMemo(
    () => items?.find((item) => item.id === value)?.label,
    [items, value]
  );

  return (
    <Box>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
        color="secondary"
      >
        {selectedLabel ?? label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => onSelect(null)}>{label}</MenuItem>
        {items?.map(({ id, label }) => (
          <MenuItem
            key={id}
            onClick={() => {
              onSelect(id);
              setAnchorEl(null);
            }}
            selected={id === value}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ListFilter;
