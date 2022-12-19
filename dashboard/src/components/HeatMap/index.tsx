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
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: false,
        // colorScale: {
        //   ranges: [
        //     {
        //       from: 0,
        //       to: Infinity,
        //       name: "profit",
        //       color: "#00A100",
        //     },
        //     {
        //       from: -Infinity,
        //       to: 0,
        //       name: "loss",
        //       color: "#FF0000",
        //     },
        //   ],
        // },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    }
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
