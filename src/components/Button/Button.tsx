import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const Button = ({
    label,
    type = 'button',
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            id={'btn' + label.trim()}
            className={styles.button}
            style={props.style}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
