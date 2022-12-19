import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper, Stack, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export interface IndicatorPanelPeriodicityFiltersProps {
  start: number;
  end: number;
  setStart: (newStart: number) => any;
  setEnd: (newEnd: number) => any;
}

export default function IndicatorPanelPeriodicityFilters({
  start,
  end,
  setStart,
  setEnd,
}: IndicatorPanelPeriodicityFiltersProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper style={{ padding: "2rem" }}>
        <Stack spacing={3}>
          <DateTimePicker
            label="Start"
            value={dayjs(start)}
            onChange={(newValue: Dayjs | null) =>
              setStart(
                newValue ? newValue.toDate().getTime() : new Date().getTime()
              )
            }
            renderInput={(params: any) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End"
            value={dayjs(end)}
            onChange={(newValue: Dayjs | null) =>
              setEnd(
                newValue ? newValue.toDate().getTime() : new Date().getTime()
              )
            }
            renderInput={(params: any) => <TextField {...params} />}
          />
        </Stack>
      </Paper>
    </LocalizationProvider>
  );
}
