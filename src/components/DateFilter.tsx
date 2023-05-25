import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useState } from "react";
import { Dayjs } from "dayjs";

type Props = {
  label: string;
  value?: string;
  onSelect: (date: string | null) => void;
};

function DateFilter({ label, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const handleChange = (value: Dayjs | null) =>
    onSelect(value ? value.format("yyyy-mm-dd") : null);

  return (
    <DatePicker
      label={label}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      value={null}
      onChange={handleChange}
      slots={{
        field: ({ id, InputProps: { ref } = {}, label }) => (
          <Button
            id={id}
            ref={ref}
            onClick={() => setOpen((prev) => !prev)}
            endIcon={<CalendarTodayIcon />}
            variant="contained"
            color="secondary"
          >
            {label}
          </Button>
        ),
      }}
    />
  );
}

export default DateFilter;
