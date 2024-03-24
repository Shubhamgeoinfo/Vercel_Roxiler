// Import the Chart.js library.
import Chart from "chart.js/auto";

// Import the Bar component from the react-chartjs-2 library.
import { Bar } from "react-chartjs-2";
import barLabel from "../../data/barLabel";
import months from "../../data/months";
import "./graph.css";

/**
 * Define a functional component named BarChart
 */
const BarChart = ({ month, barData }) => {
  // Define an array of labels.
  const labels = barLabel;
  const dataBar = barLabel.map(
    (current) => barData.find((val) => val._id === current)?.count || 0
  );

  // Defined an object
  const data = {
    labels: labels,
    datasets: [
      {
        label: `Bar Chart Stats - ${months[month]}`,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataBar,
      },
    ],
  };

  // Return the Bar component, passing in the data object as a prop.
  return (
    <Bar data={data} style={{ width: "50vw", backgroundColor: "white" }} />
  );
};

// Export the BarChart component as the default export of the module.
export default BarChart;
