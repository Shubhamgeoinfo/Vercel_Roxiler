import React from "react"; // Import the necessary library such as React for now.

import { Pie } from "react-chartjs-2";
import months from "../../data/months";
// Define an array of labels.

// Defined an object.

/**
 * Define a functional component named PieChart
 * that returns a Pie component from react-chartjs-2,
 */
const PieChart = ({ pieData, month }) => {
  const dataset = pieData.map((current) => current?.count);

  const data = {
    labels: pieData.map((current) => current?.category),
    datasets: [
      {
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
        data: dataset,
      },
    ],
  };
  return (
    <div>
      <h4>Pie Chart stats - {months[month]}</h4>
      <Pie data={data} />
    </div>
  );
};

// PieChart component is exported as default module.
export default PieChart;
