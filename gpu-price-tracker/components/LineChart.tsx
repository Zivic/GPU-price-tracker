"use client"
import React from "react";
import 'chart.js/auto';
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from 'chart.js';

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
  }


const data: ChartData<'line'> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };
  
  const options: ChartOptions<'line'> = {

    scales: {
        myScale: {
            axis: 'r'
          }
    }
  };
// const options: ChartOptions<'line'> = {
//     scales: {
//       myScale: {
//         type: 'logarithmic',
//         position: 'right', // `axis` is determined by the position as `'y'`
//       }
//     }
//   }

const LineChart = () => {
  return <div className = "w-full h-full">
          <Line data={data} options={options} />
  </div>;
};
export default LineChart;
