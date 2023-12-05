import { useEffect, useState } from 'react';
import Chart from './Chart.tsx';
import StataInput from './StataInput.tsx';
import AllStata from './AllStata.tsx';
import axios from 'axios';
import MyButton from "../MyButton/MyButton.tsx";

async function fetchStata(id: number) {
    const response = await axios.get(
      `https://nutrition-o5ja.onrender.com/api/stata/${id}`
    );
    return response.data;
}

export default function Stata({ id }: { id: number }) {
    const [data, setData] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchStata(id);
            setData(result);
        };

        fetchData();
    }, []);

    const handleAddButtonClick = () => {
        setIsAdding((prevIsAdding) => !prevIsAdding);
    };

    const handleModalClose = () => {
        setIsAdding(false);
    };

    return (
        <div>
            <div style={{ width: '900px', height: '500px', border: '2px solid red', margin: '30px' }}>
                {data && <Chart data={data} />}
            </div>
            <AllStata data={data} setData={setData} onDeleteStata={undefined} />
            <MyButton onClick={handleAddButtonClick}>Добавить данные</MyButton>
            {isAdding && <StataInput id={id} setData={setData} onClose={handleModalClose} />}
        </div>
    );
}
