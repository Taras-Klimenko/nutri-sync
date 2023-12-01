import React, { useEffect, useState } from 'react';
import './Statistics.css';
import { Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { addWeight, getParameters } from '../redux/store/thunkActions';

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
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const addWeightHandler = (input) => {
    dispatch(addWeight(input));
  };
  useEffect(() => {
    dispatch(getParameters());
  }, []);

  const parameters2 = {
    name: 'Nikita Kiptev',
    age: 31,
    height: 187,
  };

  const { parameters } = useAppSelector((store) => store.userSlice);

  const weightsArray = [];

  parameters.forEach((item) => {
    weightsArray.push(item.weight);
  });

  const bmi = weightsArray.map((el) => calculateBMI(el, parameters2.height));

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

  const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Вес',
        data: weightsArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(0, 99, 132, 0.2)',
        // tension: 0.4,
      },
      {
        label: 'Индекс массы тела',
        data: bmi,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // tension: 0.4,
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
          {Object.entries(parameters2).map(([key, value]) => (
            <div key={key}>
              <span>{key}:</span> {value}
            </div>
          ))}
          <label htmlFor="weightInput">Weight</label>
          <input
            id="weightInput"
            type="text"
            onChange={(event) => {
              setInput(() => event.target.value);
            }}
          />
          <button onClick={() => addWeightHandler(input)}>Send</button>
        </div>
        <div className="second element">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
