import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = () => {
    const [month, setMonth] = useState()
    const items = new Array(0,0,0,0,0,0,0,0,0,0)
    useEffect(() => {
         fetch('http://localhost:8000/api/products/bar-chart/2')
        .then(response => response.json())
        .then(response => {
            let data = response;
            console.log(data);
            data.map((item)=>{
                if(0>=item._id<=100){
                    items.splice(0, 1,item.count)
                }
                else if(101>=item._id<=200){
                    items.splice(1, 1,item.count)
                }
                else if(201>=item._id<=300){
                    items.splice(2, 1,item.count)
                }
                else if(301>=item._id<=400){
                    items.splice(3, 1,item.count)
                }
                else if(401>=item._id<=500){
                    items.splice(4, 1,item.count)
                }
                else if(501>=item._id<=600){
                    items.splice(5, 1,item.count)
                }
                else if(601>=item._id<=700){
                    items.splice(6, 1,item.count)
                }
                else if(701>=item._id<=800){
                    items.splice(7, 1,item.count)
                }
                else if(801>=item._id<=900){
                    items.splice(8, 1,item.count)
                }
                else if(900>=item._id){
                    items.splice(9, 1,item.count)
                }
            })
        })
        .catch(err => console.error(err));
    },[]);

  const data = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '900-above'],
    datasets: [
      {
        label: 'Number of Items',
        data: items, 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Items by Price Range',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price Range',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Items',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart Of Items</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
