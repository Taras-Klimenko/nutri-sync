import React from 'react';
import './Statistics.css';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const parameters = {
    name: 'Nikita Kiptev',
    age: 31,
    height: 187,
  };

  const weight = [40, 85, 45, 80, 82, 85, 87, 90, 92];
  
  const bwi = weight.map((el) => calculateBMI(el, parameters.height));
  
  function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.floor(bmi);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Показатели пациента Киптев Никита',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Вес',
        data: weight,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(0, 99, 132, 0.2)',
      },
      {
        label: 'Индекс массы тела',
        data: bwi,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Чувство юмора',
        data: [100, 90, 75, 70, 67, 60, 55],
        borderColor: 'rgb(255, 52, 115)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="statistics first container column">
      <div>Никита Киптев</div>
      <div className="statistics second container row">
        <div className="first element">
          {Object.entries(parameters).map(([key, value]) => (
            <div key={key}>
              <span>{key}:</span> {value}
            </div>
          ))}
        </div>
        <div className="second element">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
