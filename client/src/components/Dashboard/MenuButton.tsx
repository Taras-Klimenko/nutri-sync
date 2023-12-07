import { ReactElement, ReactNode, MouseEvent } from 'react';
import styles from './MenuButton.module.css'; // Импорт стилей из модуля

interface MenuButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function MenuButton({ onClick, children }: MenuButtonProps): ReactElement {
    return (
        <button className={styles.menuButton} onClick={onClick}>
            {children}
        </button>
    );
}
