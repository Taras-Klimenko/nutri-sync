import { useState } from 'react';
import MyButton from '../MyButton/MyButton.tsx';
import EditModal from './EditModal.tsx';
import './AllStata.css';

export default function AllStata({ data, onDeleteStata, setData }) {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [editingData, setEditingData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Добавлено состояние для модального окна

    const handleEditStata = (data) => {
        setEditingData(data);
        setIsModalOpen(true); // Открываем модальное окно при редактировании
    };

    const handleEditModalClose = () => {
        setEditingData(null);
        setIsModalOpen(false); // Закрываем модальное окно при закрытии
    };
    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = () => {
        return currentItems.map((item: any) => (
            <div className='allStata-new' key={item.id}>
                Параметры на: <br/> {item.createdAt.slice(0, 10)}
                <p>Рост см: {item.height}</p>
                <p>Вес кг: {item.weight}</p>
                <p>Объем груди см: {item.chest}</p>
                <p>Объем талии см: {item.waist}</p>
                <p>Объем бедер см: {item.hips}</p>
                <p>ИМТ: {item.BMI}</p>
                <MyButton onClick={() => handleEditStata(item)}>Редактировать</MyButton>
            </div>
        ));
    };

    const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='allStata'>
            {renderItems()}
            <div>
                {pageNumbers.map((number) => (
                    <MyButton key={number} onClick={() => paginate(number)} style={{cursor: 'pointer', margin: '5px'}}>
                        {number}
                    </MyButton>
                ))}
            </div>
            {editingData && isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <EditModal
                            setData={setData}
                            data={editingData}
                            onSave={(editedData) => {
                            }}
                            onDelete={() => onDeleteStata(editingData.id)}
                            onClose={handleEditModalClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
