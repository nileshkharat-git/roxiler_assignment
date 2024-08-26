import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ month }) => {
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/bar-chart/${month}`)
      .then((response) => response.json())
      .then((response) => {
        let data = response;
        let collectLabels = []
        let collectValues = []
        data.map((item) => {
          collectLabels.push(item.label);
          collectValues.push(item.value);
        });
        setLabels(collectLabels);
        setValues(collectValues);
      })
      .catch((err) => console.error(err));
  }, [month]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Items",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Items by Price Range",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Items",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-2/4 mx-auto my-8">
      <h2>Bar Chart Of Items</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
