import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export default function IndicatorPanelPeriodicityFilters() {

    const [start, setStart] = useState<Dayjs | null>(dayjs(new Date()));
    const [end, setEnd] = useState<Dayjs | null>(
        dayjs(new Date(
            new Date().getTime() - (365 * 24 * 60 * 60 * 1000))
        )
    )

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper style={{ padding: "2rem" }}>
            <Stack spacing={3}>
                <DateTimePicker
                    label="Start"
                    value={start}
                    onChange={(newValue: Dayjs | null) => setStart(newValue)}
                    renderInput={(params: any) => <TextField {...params} />}
                />
                <DateTimePicker
                    label="End"
                    value={end}
                    onChange={(newValue: Dayjs | null) => setEnd(newValue)}
                    renderInput={(params: any) => <TextField {...params} />}
                />
            </Stack>
        </Paper>
    </LocalizationProvider>
}