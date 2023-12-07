import { ReactElement, ReactNode, MouseEvent } from 'react';
import styles from './EditButton.module.css'; // Импорт стилей из модуля

interface EditButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function EditButton({ onClick, children }: EditButtonProps): ReactElement {
    return (
        <button className={styles.editButton} onClick={onClick}>
            {children}
        </button>
    );
}
