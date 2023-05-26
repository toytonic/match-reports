import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  label: string;
  value?: string;
  onSelect: (date: string) => void;
};

function DateFilter({ label, onSelect, value }: Props) {
  const [open, setOpen] = useState(false);
  const handleChange = (value: Dayjs | null) => {
    if (value) {
      onSelect(value.format("YYYY-MM-DD"));
    }
  };

  return (
    <DatePicker
      label={label}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      value={value ? dayjs(value) : null}
      minDate={dayjs("2021-01-01")}
      maxDate={dayjs("2021-12-31")}
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
