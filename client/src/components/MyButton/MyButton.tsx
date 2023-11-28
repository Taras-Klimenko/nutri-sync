import { ReactElement, ReactNode, MouseEvent } from 'react';
import styles from './MyButton.module.css'; // Импорт стилей из модуля

interface MyButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function MyButton({ onClick, children }: MyButtonProps): ReactElement {
    return (
        <button className={styles.myButton} onClick={onClick}>
            {children}
        </button>
    );
}
