import Chart from "react-apexcharts";
import { useState } from "react";

const PieChart = ({
    width = '100%',
    labels = ['Apple', 'Mango', 'Orange', 'Watermelon'],
    series = [44, 55, 13, 33],
}) => {

    const [options, setOptions] = useState({
        chart: {
            type: 'donut',
        },
        labels: [...labels]

    } as ApexCharts.ApexOptions);

    return (
        <div
            className="Donut"
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <Chart options={options} series={series} type="donut" width={width} />
        </div>
    );
};

export default PieChart