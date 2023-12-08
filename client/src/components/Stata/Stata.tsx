import { useEffect, useState } from 'react';
import Chart from './Chart.tsx';
import StataInput from './StataInput.tsx';
import AllStata from './AllStata.tsx';
import axios from 'axios';
import MyButton from '../MyButton/MyButton.tsx';
import './Stata.css'

async function fetchStata(id: number) {
  const response = await axios.get(
    `${import.meta.env.VITE_URL}api/stata/${id}`
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
    const handleDataUpdate = async () => {
        const updatedData = await fetchStata(id);
        setData(updatedData);
    };

  return (
      <div className='stata'>
          <div>
              <div className='statapic'>
                  {data && <Chart data={data}/>}
              </div>
          </div>
          <div >
              <div>
                  <AllStata data={data} onDeleteStata={undefined} setData={handleDataUpdate}/>
              </div>
              <div>
                  {isAdding && (
                      <StataInput id={id} onClose={handleModalClose} SetData={handleDataUpdate}/>
                  )}
              </div>
              <MyButton onClick={handleAddButtonClick}>Добавить данные</MyButton>
          </div>
      </div>
  );
}
