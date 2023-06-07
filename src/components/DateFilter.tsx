import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { maxDate, minDate } from "../constants";

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
      minDate={dayjs(minDate)}
      maxDate={dayjs(maxDate)}
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
            size="small"
          >
            {label}
          </Button>
        ),
      }}
    />
  );
}

export default DateFilter;
