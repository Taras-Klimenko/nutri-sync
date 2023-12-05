import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const chartData = {
        labels: data?.map(item => item.createdAt.slice(0, 10)),
        datasets: [
            {
                label: 'Вес кг',
                data: data?.map(item => item.weight),
                borderColor: 'rgb(192,75,141)',
                borderWidth: 3,
            },
            {
                label: 'Рост см',
                data: data?.map(item => item.height),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 3,
            },
            {
                label: 'Обхват груди',
                data: data?.map(item => item.chest),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
            {
                label: 'Обхват талии',
                data: data?.map(item => item.hips),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
            {
                label: 'Обхват бедер',
                data: data?.map(item => item.waist),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
            {
                label: 'BMI',
                data: data?.map(item => item.BMI),
                borderColor: 'rgb(191,29,227)',
                borderWidth: 3,
            },
        ],
    };

    const options = {
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return <Line data={chartData} options={options} />;
};

export default Chart;
