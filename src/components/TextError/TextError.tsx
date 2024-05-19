import React, { CSSProperties } from 'react';
import { FieldError } from 'react-hook-form';

import './TextError.module.css';

interface ButtonProps {
    label?: FieldError;
    size?: string;
}

export const TextError = ({ label, size, ...props }: ButtonProps) => {
    const defaultTextErrorStyle: CSSProperties = {
        fontSize: size ?? '0.5rem'
    };

    return label ? (
        <div
            className="defaultTextErrorStyle"
            style={defaultTextErrorStyle}
        >
            {label.message}
        </div>
    ) : null;
};
