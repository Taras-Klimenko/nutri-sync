import React, { ReactNode, MouseEvent, useState } from 'react';

interface MyButtonProps {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NewButton: React.FC<MyButtonProps> = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: isHovered ? '#43a047' : '#4caf50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '23px',
        cursor: 'pointer',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
};

export default NewButton;
