import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const LineChart = ({ title, data }) => {
  const lineChartRef = useRef(null);

  useEffect(() => {
    let labelsArray = [];

    Object.keys(data).map((clave, index) => {
      labelsArray.push(`${index + 1}`);
    });

    const ctx = lineChartRef.current.getContext("2d");

    if (lineChartRef.current.chart) {
      lineChartRef.current.chart.destroy();
    }

    Chart.register(ChartDataLabels);

    lineChartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labelsArray,
        datasets: [
          {
            label: "a",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            position: "top",
          },
          title: {
            font: {
              size: 24,
            },
            display: true,
            text: title,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });
  }, []);

  return <canvas ref={lineChartRef} />;
};

export default LineChart;
