import * as React from 'react'
import { Paper, Typography } from '@mui/material';

export interface IndicatorPanelProps {
    label?: string
    elevation?: number;
    style?: { height: string, width: string, padding: string, boxSizing: any, display: any, flexDirection: any, }
    children?: any
}

const defaultProps: IndicatorPanelProps = {
    elevation: 3,
    style: { height: "100%", width: "100%", padding: "2rem", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },
    label: "Indicator label"
}

export default function IndicatorPanel(props: IndicatorPanelProps) {
    return <Paper
        elevation={props.elevation || defaultProps.elevation}
        style={{ ...defaultProps.style, ...props.style }}>
        <Typography variant="h6" gutterBottom>
            {props.label || defaultProps.label}
        </Typography>
        <div style={{ display: "flex", height: "100%", width: '100%', alignItems: "center", justifyContent: 'center' }}>
            {props.children}
        </div>
    </Paper>
}