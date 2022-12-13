import Chart from "react-apexcharts";
import { useState } from "react";

const LineChart = ({
    width = '100%',
    colors = ["#FF1654", "#247BA0"],
    series = [
        {
            name: "Series A",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
            name: "Series B",
            data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
    ]
}) => {
    const [options, setOptions] = useState({
        chart: {
            type: "line",
        },
        colors: [...colors],
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 0,
        }
    } as ApexCharts.ApexOptions);

    return (
        <div
            className="Line"
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <Chart options={options} series={series} type="line" width={width} />
        </div>
    );
};

export default LineChart