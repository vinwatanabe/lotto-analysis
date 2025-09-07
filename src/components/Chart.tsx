'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

type ChartBoxProps = {
  frequency: [string, number][];
};

const ChartBox = ({ frequency }: ChartBoxProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const labels = frequency.map(([key]) => key);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = frequency.map(([_, value]) => value);

    const colorPalette = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
    ];

    const backgroundColors = data.map((_, index) => {
      return colorPalette[index % colorPalette.length];
    });

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Frequency Number',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value) => {
              // The `value` parameter is the actual data point's value
              return value;
            },
            color: '#333',
            font: {
              weight: 'bold',
            },
            anchor: 'end',
            align: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [frequency]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartBox;
