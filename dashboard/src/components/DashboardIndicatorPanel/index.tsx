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
import Admin from '../../services/api/admin.service';
import { fetchAnalytics } from '../../store/actions/AdminAction';
import { sliceNumber } from '../../utils/StringUtils';
import AreaChart from '../AreaChart/index';

export default function DahsboardIndicatorPanel() {

    const dispatch = useAppDispatch();
    const analytics = useAppSelector(({ analytics }) => analytics)

    const [startTimestamp, setStartTimestamp] = useState(Math.ceil(Date.now() - 365 * 24 * 60 * 60 * 1000))
    const [endTimestamp, setEndTimestamp] = useState(Math.ceil(Date.now()))

    useEffect(() => {
        Admin.getAnalytics(startTimestamp, endTimestamp).then((data: any) => {
            dispatch(
                fetchAnalytics(data.ticketAnalytics)
            )
        })
    }, [])

    useEffect(() => {
        console.log(analytics)
    }, [analytics])

    return (
        <Grid container spacing={4} style={{ height: "100vh", width: "100%" }}>
            <Grid item xs={12} >
                <IndicatorPanelPeriodicityFilters />
            </Grid>
            <Grid item xs={12} lg={6} >
                <IndicatorPanel label='Total revenue ($)'>
                    <Typography variant='h3'>
                        {sliceNumber(analytics.ticketAnalytics.periodTotalRevenue[0].sum, 2)}
                    </Typography>
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} lg={6} >
                <IndicatorPanel label="Products number by category">
                    <PieChart series={analytics.ticketAnalytics.productsByCategories.map(({ count }) => count)} labels={analytics.ticketAnalytics.productsByCategories.map(({ category: { label } }) => label)} />
                </IndicatorPanel>
            </Grid>
            <Grid item xs={12} >
                <IndicatorPanel label="Daily revenue progression">
                    <AreaChart
                        xAxisCategories={analytics.ticketAnalytics.daylyPeriodRevenue.map(({
                            _id
                        }) => _id)}
                        series={[
                            {
                                name: "product revenue",
                                data: analytics.ticketAnalytics.daylyPeriodRevenue.map(({
                                    _id,
                                    sum
                                }) => ({
                                    x: _id,
                                    y: sliceNumber(sum, 2)
                                }))
                            },
                        ]} />
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