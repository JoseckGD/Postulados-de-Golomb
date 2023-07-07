import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BarChart = ({ title, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let labelsArray = [],
      dataArray = [],
      total = 0;

    Object.keys(data).map((clave) => {
      labelsArray.push(`${clave.split("_")[1]}`);
      // dataArray.push(data[clave]);
      total += data[clave];
    });

    Object.keys(data).map((clave) => {
      dataArray.push(`${((data[clave] / total) * 100).toFixed(2)}`);
    });

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    Chart.register(ChartDataLabels);

    chartRef.current.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelsArray,
        datasets: [
          {
            label: "No. de combinaciones",
            data: dataArray,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            anchor: "end",
            backgroundColor: "rgba(75, 192, 192, 1)",
            padding: "3",
            borderRadius: "16",
            display: true,
            color: "black",
            font: {
              size: 8,
              weight: "bold",
            },
            formatter: function (value, context) {
              return value + "%";
            },
          },
          tooltip: {
            enabled: false,
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
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
