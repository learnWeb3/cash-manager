import Chart from "react-apexcharts";
import { useState } from "react";

export interface HeatMapProps {
  width?: string;
  series: { name: string; data: { x: string; y: number }[] }[];
}

const HeatMap = ({
  width = "100%",
  series = [
    {
      name: "Metric1",
      data: [
        { x: "test", y: 3200 },
        { x: "test1", y: 3 },
        { x: "test2", y: 17363 },
      ],
    },
  ],
}: HeatMapProps) => {
  const colors = ["#a2d2ff", "#ffafcc", "#cdb4db", "#849483"];
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "heatmap",
      colorScale: {
        ranges: series.map(({ data, name }, index) => {
          return {
            from: data.reduce(
              (min, { y: dataPoint }) => (dataPoint < min ? dataPoint : min),
              0
            ),
            to: data.reduce(
              (max, { y: dataPoint }) => (dataPoint > max ? dataPoint : max),
              0
            ),
            color: colors[index],
            name: "low",
          };
        }),
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors,
  });

  return (
    <div
      className="Donut"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Chart
        options={options as ApexCharts.ApexOptions}
        series={series}
        type="heatmap"
        width={width}
      />
    </div>
  );
};

export default HeatMap;
