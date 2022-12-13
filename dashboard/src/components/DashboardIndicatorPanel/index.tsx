import * as React from 'react';
import Grid from '@mui/material/Grid';
import IndicatorPanel from '../IndicatorPanel/index';
import ColumnChart from '../ColumnChart';
import LineChart from '../LineChart/index';
import PieChart from '../Pichart/index';
import { Typography } from '@mui/material';
import IndicatorPanelPeriodicityFilters from '../IndicatorPanelPeriodicityFilters/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';

export default function DahsboardIndicatorPanel() {

    const analytics = useAppSelector(({ analytics }) => analytics);
    const [daylyPeriodRevenue, setDailyPeriodRevenue] = useState([])

    useEffect(() => {
        
    }, [analytics])
    return (
        <Grid container spacing={4} style={{ height: "100vh", width: "100%" }}>
            <Grid item xs={12} >
                <IndicatorPanelPeriodicityFilters />
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <Typography variant='h3'>
                        {analytics.ticketAnalytics.periodTotalRevenue.sum}
                    </Typography>
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <ColumnChart />
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <PieChart />
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <Typography variant='h3'>
                        200
                    </Typography>
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <ColumnChart />
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={4} >
                <IndicatorPanel>
                    <ColumnChart />
                </IndicatorPanel>
            </Grid>
        </Grid>
    );
}