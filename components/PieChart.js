// src/components/PieChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ month }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/api/pie-chart', { params: { month } });
    setData(response.data);
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Number of Items',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
